import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/core';
import { Button, Input } from 'native-base';
import React, { FC, useState, useEffect, useMemo, useRef } from 'react';
import {
    View,
    Text,
    Pressable,
    BackHandler,
    VirtualizedList,
    ScrollView
} from 'react-native';
import { ParticipantType } from '../../AppState/MessagingHubState/Enums/ParticipantType';
import { ReferenceType } from '../../AppState/MessagingHubState/Enums/ReferenceType';
import { IReference } from '../../AppState/MessagingHubState/Interfaces/IReferenceDetails';
import { MessageDetails } from '../../AppState/MessagingHubState/Interfaces/MessageDetails';
import {
    setDraftMessage,
    addMessageDraftReferences,
    updateMessageDraftTitle,
    deleteAttachmentFromReferences,
} from '../../AppState/MessagingHubState/MessagingHubSlice';
import { useReduxDispatch, useReduxSelector } from '../../AppState/Store';
import FilePickerTemplate from '../../Components/InputFields/Document/FilePickerTemplate';
import { AttachFilePreview } from '../../Components/InputFields/Document/AttachFilePreview';
import { RequestModule } from '../../RequestModule/RequestModule';
import { IConversationViewProps as IConversationViewProps } from '../Interfaces/IConversationViewProps';
import { IViewableItemsChangedParams } from '../Interfaces/IViewableItemsChangedParams';
import AttacmentItem from './AttacmentItem';
import { ConversationViewStyle } from './ConversationViewsStyles/conversationViewStyle';
import MessageItemView from './MessageItemView';
import ParticipantItem from './ParticipantItem';
import { AttachmentButton } from '../../Components/InputFields/Document/AttachmentButton';
import { MessageStatus } from '../../AppState/MessagingHubState/Enums/MessageStatus';

const ConversationView: FC<IConversationViewProps> = ({ dataAccessLayer }): JSX.Element => {
    //#region Computed values, variables, hooks
    const DAL = dataAccessLayer;
    const { conversations, draftMessage, objectId } = useReduxSelector(state => state.MessagingHub);
    const { userData } = useReduxSelector(state => state.MainScreen);
    const isHideArchiveMessages = useReduxSelector(state => state.MainScreen).templateOptions?.conversationDisplayConfig.hideArchivedMessages;
    const textInputRef = useRef(null);
    const chatRef = useRef(null)
    const navigation = useNavigation();
    const [changeText, setChangeText] = useState<string>('');
    const [editingProc, setEditingProc] = useState<boolean>(false);
    const [editingMessage, setEditingMessage] = useState<MessageDetails | undefined>();
    const [replyProc, setReplyProc] = useState<boolean>(false);
    const [replyModel, setReplyModel] = useState<MessageDetails>();
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const dispatch = useReduxDispatch();
    const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 75 });

    const conversationId = useMemo(() => {
        let id = getConversationId(objectId)
        return id
    }, [objectId]);

    useEffect(() => {
        DAL.getConversationDetails(conversationId)
    }, [conversationId])

    const conversation = useMemo(() => {
        const conv = conversations.find((conv) => {
            return conv.id === conversationId
        })
        return conv
    }, [conversations])

    useEffect(() => {
        getDraftMessage()
    }, [conversation])

    //#endregion

    //#region Hardware back button behavior
    const backButtonAction = () => {
        navigation.goBack();
        return true
    };

    BackHandler.addEventListener(
        "hardwareBackPress", () => backButtonAction()
    );
    //#endregion

    //#region TextInput handlers

    function textChangeHandler(text: string) {
        setChangeText(text);
        if (draftMessage != undefined) {
            dispatch(updateMessageDraftTitle(text))
        };
    };

    function textInputValue() {
        if (draftMessage != undefined && replyProc === false && editingProc === false) {
            return draftMessage.title
        } else {
            return changeText
        };
    };

    //#endregion

    //#region Render and layout functions

    function conversationView(): JSX.Element {
        return (
            <View style={ConversationViewStyle.boxView}>
                {
                    conversation === undefined
                        ? <View style={ConversationViewStyle.boxView} />
                        : <VirtualizedList<MessageDetails>
                            ref={chatRef}
                            data={conversation?.messages === undefined
                                ? []
                                : conversation.messages}
                            keyExtractor={(item) => item.id}
                            initialNumToRender={50}
                            extraData={conversation}
                            onViewableItemsChanged={onViewableItemsChanged}
                            viewabilityConfig={viewabilityConfig.current}
                            getItem={(data, index) => {
                                if (Array.isArray(data)) {
                                    return data[index]
                                } else return {};
                            }}
                            onContentSizeChange={() => {
                                chatRef?.current?.scrollToEnd({ animated: true })
                            }}
                            getItemCount={(data: MessageDetails[]) => data?.length}
                            renderItem={({ item }) => {

                                if (item.isDraft || item == undefined) {
                                    return <View />
                                } else if (item.isArchived && isHideArchiveMessages) {
                                    return <View />
                                } else return (
                                    <View style={{ alignSelf: userData?.username != item.creator.fullName ? 'flex-start' : 'flex-end' }}>
                                        <MessageItemView
                                            editMessage={() => beginMessageEditing(item)}
                                            archiveMessage={() => archiveMessage(item.id)}
                                            replyMessage={() => replyMessage(item)}
                                            key={item.id}
                                            message={item}
                                            user={userData!}
                                        />
                                    </View>
                                )
                            }}

                        />
                }
                <View style={ConversationViewStyle.view}>
                    {editAndReplyDetalis()}
                    <ScrollView style={{ maxHeight: 70, backgroundColor: " #05bd42" }}>
                        {draftMessage?.references.map((item) => {
                            return (
                                <AttachFilePreview
                                    filename={item.title!}
                                    deliteFile={async () => {
                                        let response = await RequestModule.send("/mobile/Attachment/Remove/" + item.id, "DELETE"); //TODO попробовать удалить и посмотреть, что будет
                                        if (response) {
                                            dispatch(deleteAttachmentFromReferences(item.id!))
                                            updateMessageDraft();
                                        }
                                    }}
                                    key={item.id}
                                />
                            )
                        })}
                    </ScrollView>
                    <Input
                        style={ConversationViewStyle.input}
                        ref={textInputRef}
                        multiline={true}
                        value={textInputValue()}
                        onChangeText={(text) => textChangeHandler(text)}
                        numberOfLines={2}
                        InputLeftElement={attachmentButton()}
                        InputRightElement={sendButton()}
                        onBlur={() => updateMessageDraft() }
                    />
                </View>
            </View>
        )
    };

    function onViewableItemsChanged({ viewableItems, changed }: IViewableItemsChangedParams): void {
        viewableItems.forEach((item) => {
            if (item.item.creator.id != userData?.accountId && item.item.isRead == false && item.isViewable == true) {
                DAL.changeMessageStatus([item.item.id], MessageStatus.Read);
            }
        })
    };

    function editAndReplyDetalis(): JSX.Element {
        if (editingMessage != undefined) {
            return (
                <View>
                    <Text>{editingMessage.title}</Text>
                </View>
            )
        } else if (replyModel != undefined) {
            return (
                <View>
                    <Text>{replyModel.title}</Text>
                </View>
            )
        } else return <View />
    };

    function settingsView(): JSX.Element {
        const conversation = conversations.find((conv) => {
            return conv.id === conversationId;
        })
        const participants = conversation?.participants;
        const attachments = conversation?.attachments;


        return (
            <ScrollView>
                <Text>Participants</Text>
                {
                    participants != undefined
                        ? participants?.map((item) => <ParticipantItem participant={item} key={item.id} />)
                        : <View />
                }

                <Text>Attachments</Text>
                {
                    attachments != undefined
                        ? attachments?.map((item) => <AttacmentItem attachment={item} key={item.id} />)
                        : <View />
                }
            </ScrollView>
        )
    };

    //#endregion

    //#region Edit, reply, archive functions

    function beginMessageEditing(originMessage: MessageDetails): void {
        setEditingProc(true);
        setChangeText(originMessage.title);
        setEditingMessage(originMessage);
        textInputRef?.current?.focus();
    };

    function editMessage(): void {
        let editedMessage: MessageDetails = Object.assign({}, editingMessage);
        editedMessage.title = textInputValue();
        DAL.editMessage(editedMessage);
    };

    function archiveMessage(messageId: string): void {
        DAL.changeMessageStatus([messageId], MessageStatus.Archived);
    };

    function replyMessage(replyMess: MessageDetails): void {
        setReplyProc(true)
        setReplyModel(replyMess);
        const ref: IReference = { type: ReferenceType.Reply, referencedMessage: { id: replyMess.id } }
        dispatch(addMessageDraftReferences(ref))
    };


    //#endregion

    //#region TextInput button handlers and views

    function firstMessageCreation() {
        const newDraft = {
            creator: {
                id: userData?.accountId,
                type: ParticipantType.User
            },
            title: changeText,
            //TODO убрать null, когда прикрутим функционал вложений
            attachment: null
        };
        const newMessage = {
            message: newDraft,
            objId: objectId
        };
        //@ts-ignore
        DAL.createFirstMessage(newMessage);
        setChangeText('');
        DAL.getConversationDetails(conversationId);
    };

    function sendNewMessage() {
        if (draftMessage?.title?.length != 0 || draftMessage.references.length > 0) {
            DAL.sendMessage(draftMessage!)
            setChangeText('');
            dispatch(updateMessageDraftTitle(''))
            if (replyProc) {
                setReplyProc(false)
            };
        } else return;
    };

    function sendButtonPressEvent() {
        if (editingProc == true) {
            editMessage();
            setChangeText('');
            dispatch(updateMessageDraftTitle(''))
            setEditingMessage(undefined);
            setEditingProc(false);
        } else {
            draftMessage != undefined
                ? sendNewMessage()
                : firstMessageCreation()
        }
        setReplyModel(undefined)
    };

    function sendButton() {
        return (
            <Pressable onPress={() => sendButtonPressEvent()} style={ConversationViewStyle.buttonSend}>
                <FontAwesomeIcon icon={faArrowAltCircleRight} size={30} style={ConversationViewStyle.icon} />
            </Pressable>
        );
    };

    function attachmentButton() {
        let filePicker = new FilePickerTemplate();
        return (
            <AttachmentButton
                pickDocument={() => {
                    let upload = filePicker.uploadDocument()
                    addAttachmentToDraft(upload);
                    return upload
                }}
                pickMedia={() => {
                    let upload = filePicker.uploadMedia()
                    addAttachmentToDraft(upload);
                    return upload
                }}
            />
        );
    };

    async function addAttachmentToDraft(upload: Promise<IReference[] | undefined>) {
        let attachmet = await upload
        const cloneDraft = JSON.parse(JSON.stringify(draftMessage)) as MessageDetails
        if (attachmet) {
            attachmet?.forEach(item => cloneDraft.references.push(item))
            DAL.updateDraft(cloneDraft!)
        }
    };

    function updateMessageDraft() {
        DAL.updateDraft(draftMessage!)
    };

    //#endregion

    //#region Service functions

    //FIXME рассчёт индекса
    function firstUnreadMessageIndex(): number {
        const messageIndex = conversation?.messages?.findIndex((item) => {
            if (item.isRead == false && item.isDraft == false) {
                return true;
            } else false;
        })
        if (messageIndex != undefined && messageIndex > 0) {
            return messageIndex
        } else return 0;
    };

    function getDraftMessage(): void {
        const thisConv = conversations.find((conv) => {
            return conv.id === conversationId
        });
        const newDraft = thisConv?.messages?.find((message) => { return message.isDraft })
        if (newDraft != undefined) {
            dispatch(setDraftMessage(newDraft!))
        } else dispatch(setDraftMessage(undefined))
    };

    function getConversationId(objId: string): string {
        const conversation = conversations.find((conv) => {
            if (conv.linkedParticipant != undefined) {
                if (conv.linkedParticipant.id === objId) {
                    return true
                } else return false
            } else return false
        })
        if (conversation != undefined) {
            return conversation.id
        } else return 'undefined';
    };

    function goToSettingsPressEvent(): void {
        DAL.getConversationDetails(conversationId)
        setShowSettings(!showSettings)
    };

    //#endregion

    //#region Conversation view
    return (
        <>
            <Button
                onPress={() => goToSettingsPressEvent()}
                style={ConversationViewStyle.button}
            />
            {
                showSettings == true
                    ? settingsView()
                    : conversationView()
            }
        </>
    );
    //#endregion
};

export default ConversationView;