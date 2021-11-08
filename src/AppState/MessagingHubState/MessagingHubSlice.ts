import {
  createSlice,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { ConversationDetails } from "./Interfaces/IConversationDetails";
import { MessageDetails } from "./Interfaces/MessageDetails";
import { IMessagingState } from "./Interfaces/IMessagingState";
import { ISubscription } from "./Interfaces/ISupscription";
import { ConversationMessagesDetails } from "./Interfaces/ConversationMessagesDetails";
import { IReference } from "./Interfaces/IReferenceDetails";
import { ConnectionStatus } from "./Enums/ConnectionStatus";

const initialState: IMessagingState = {
  subscriptions: [],
  conversations: [],
  draftMessage: undefined,
  connectionStatus: ConnectionStatus.disconnected,
  objectId: '',
  transport: 'none'
};

const selectSelf = (state: IMessagingState) => state;
const selector = createSelector(selectSelf, (state) => state);
export const messagingSelector = selector(initialState);

const MessagingHubSlice = createSlice({
  name: "NotificationsSlice",
  initialState,
  reducers: {
    setUnreadMessagesCount(state, action: PayloadAction<ConversationDetails>) {
      const details = action.payload;
      const conversation = state.conversations.find((conv) => {
        if (conv.id === details.id) {
          return true;
        } else {
          return false;
        }
      })
      conversation!.unreadMessagesCount = details.unreadMessagesCount
    },

    setSubscriptions(state, action: PayloadAction<ISubscription>) {
      const subscription = action.payload;
      if (state.subscriptions.includes(subscription)) {
        return;
      } else {
        state.subscriptions.push(subscription)
      }
    },

    onUnsubscribe(state, action: PayloadAction<ISubscription>) {
      const index = state.subscriptions.indexOf(action.payload);
      state.subscriptions.splice(index, 1);
    },

    setConversations(state, action: PayloadAction<ConversationDetails>) {
      const details = action.payload;
      const conversations = state.conversations;
      const predicate = conversations.find((conv) => {
        if (conv.id === details.id) {
          return true
        } else {
          return false
        }
      })
      if (predicate) {
        return
      } else {
        conversations.push(details)
      }
    },

    setConversationDetailsReceived(state, action: PayloadAction<ConversationDetails>) {
      const details = action.payload;
      let indexOfConv = state.conversations.findIndex((conv) => {
        return conv.id === details.id
      });
      state.conversations.splice(indexOfConv, 1, details)
    },

    addMessageTo(state, action: PayloadAction<MessageDetails>) {
      const message = action.payload;
      const conv = state.conversations.find((conv) => {
        return conv.id === message.conversation;
      })
      if (conv != undefined) {
        if (conv.messages === undefined) {
          conv.messages = []
          conv.messages.push(message)
        } else {
          let index = conv.messages.findIndex((mes) => {
            return mes.id === message.id
          })
          if (index > -1) {
            conv.messages.splice(index, 1, message)
          } else {
            conv.messages.push(message)
          }
        }
      } else {
        return
      }
    },

    setReloadedMessages(state, action: PayloadAction<ConversationMessagesDetails>) {
      const messagesDetails = action.payload
      const indexOfConv = state.conversations.findIndex((conv) => {
        return conv.id === messagesDetails.id
      });
      const conv = state.conversations[indexOfConv];
      messagesDetails.messages.forEach((message) => {
        if (conv.messages === undefined) {
          conv.messages = [];
          conv.messages.push(message);
        } else {
          const indexOfMessage = conv.messages.findIndex((mes) => {
            if (mes.id === message.id) {
              return true;
            } else {
              return false;
            }
          })
          if (indexOfMessage > -1) {
            conv.messages.splice(indexOfMessage, 1, message)
          } else {
            conv.messages.push(message)
          }
        }
      });
    },

    setDraftMessage(state, action: PayloadAction<MessageDetails | undefined>) {
      const messageDetails = action.payload;
      state.draftMessage = messageDetails;
    },

    resetDraftMessage(state) {
      state.draftMessage = undefined;
    },

    updateMessageDraftTitle(state, action: PayloadAction<string>) {//
      state.draftMessage!.title = action.payload
    },

    resetMessages(state, action: PayloadAction<string>) {
      let conversation = state.conversations.find(conv =>
        conv.id === action.payload)
      if (conversation?.messages === undefined) {
        conversation!.messages = []
      } else {
        conversation!.messages = []
      };
    },

    setMessageDraft(state, action: PayloadAction<MessageDetails>) {
      state.draftMessage = action.payload;
    },

    addMessageDraftReferences(state, action: PayloadAction<IReference>) {
      state.draftMessage!.references.push(action.payload)
    },

    deleteAttachmentFromReferences(state, id: PayloadAction<string>) {
      state.draftMessage!.references = state.draftMessage!.references.filter((item) => { return item.id !== id.payload })
    },

    changeConnectionStatus(state, action: PayloadAction<ConnectionStatus>) {
      state.connectionStatus = action.payload;
    },

    resetMessagingHubState(state) {
      state.conversations = initialState.conversations;
      state.draftMessage = initialState.draftMessage;
      state.subscriptions = initialState.subscriptions;
    },

    passConversationObjectId(state, action: PayloadAction<string>) {
      state.objectId = action.payload;
    },

    //NOTE Servise action
    changeTransportType(state, action: PayloadAction<string>) {
      state.transport = action.payload;
    }

  },
});

export const {
  setUnreadMessagesCount,
  setSubscriptions,
  setConversations,
  addMessageTo,
  onUnsubscribe,
  setConversationDetailsReceived,
  setReloadedMessages,
  updateMessageDraftTitle,
  resetMessages,
  resetDraftMessage,
  setDraftMessage,
  setMessageDraft,
  addMessageDraftReferences,
  changeConnectionStatus,
  resetMessagingHubState,
  changeTransportType,
  deleteAttachmentFromReferences,
  passConversationObjectId,
} = MessagingHubSlice.actions;
export default MessagingHubSlice.reducer;
