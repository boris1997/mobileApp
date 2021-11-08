import React, { FC, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { IMessageItemView } from '../Interfaces/IMessageItemView';
import { Button, Stagger, Divider } from 'native-base';
import { ReferenceType } from '../../AppState/MessagingHubState/Enums/ReferenceType';
import { MessageItemViewStyle, TextStyle, PressableButton } from './ConversationViewsStyles/messageItemViewStyle';
import AttacmentItem from './AttacmentItem';
import { IAttachmentReferenceDetails } from '../../AppState/MessagingHubState/Interfaces/IAttachmentReferenceDetails';

const MessageItemView: FC<IMessageItemView> = ({ message, user, replyMessage, archiveMessage, editMessage }) => {
    const [isOpenStagger, setIsOpenStagger] = useState<boolean>(false);

    function refComponent() {
        const reply = message.references.find((ref) => {
            return ref.type === ReferenceType.Reply
        })
        if (reply != undefined) {
            return (
                <View style={MessageItemViewStyle.boxView}>
                    <Divider style={MessageItemViewStyle.divider} />
                    <View>
                        <Text>{reply?.referencedMessage!.creator.fullName}</Text>
                        <Text>{reply?.referencedMessage!.title}</Text>
                    </View>
                </View>
            )
        } else return <View />
    };

    return (
        <View style={{width: '48%'}} >
            <Stagger
                visible={isOpenStagger}
                initial={{
                    opacity: 0,
                    scale: 0,
                    translateY: 34,
                }}
                animate={{
                    translateY: 0,
                    scale: 1,
                    opacity: 1,
                    transition: {
                        type: "spring",
                        mass: 0.8,
                        stagger: {
                            offset: 30,
                            reverse: true,
                        },
                    },
                }}
                exit={{
                    translateY: 34,
                    scale: 0.5,
                    opacity: 0,
                    transition: {
                        duration: 100,
                        stagger: {
                            offset: 30,
                            reverse: true,
                        },
                    },
                }}
            >
                <View style={MessageItemViewStyle.boxView}>
                    {
                        user.accountId === message.creator.id
                            ? (
                                <><Button onPress={() => {
                                    editMessage();
                                    setIsOpenStagger(false);
                                }}>Edit</Button><Button onPress={() => {
                                    archiveMessage();
                                    setIsOpenStagger(false);
                                }}>Arch</Button></>
                            )
                            : <View />
                    }
                    <Button onPress={() => {
                        replyMessage();
                        setIsOpenStagger(false)
                    }} >Repl</Button>
                </View>

            </Stagger>
            <PressableButton isArchived={message.isArchived}
                onLongPress={() => setIsOpenStagger(!isOpenStagger)}
            >
                <View  >
                    <View style={MessageItemViewStyle.view}>
                        <TextStyle color={message.creator.color}>{message.creator.fullName}</TextStyle>
                        <Text>{message.creationDate.toString()}</Text>
                    </View>
                    {
                        refComponent()
                    }
                    <View style={MessageItemViewStyle.view1}>
                        <Text>{message.title}</Text>
                    </View>
                    <View style={MessageItemViewStyle.view}>
                        {
                            message.isEdited != true
                                ? <View />
                                : <Text>Исправлено</Text>
                        }
                        {message.isRead != true
                            ? <FontAwesomeIcon icon={faCheckDouble} size={18} style={MessageItemViewStyle.iconFirst} />
                            : <FontAwesomeIcon icon={faCheckDouble} size={18} style={MessageItemViewStyle.iconSecond} />
                        }
                    </View>
                </View>
                {
                    message.references != undefined
                        ? message.references.map((ref) => {
                            if (ref.type === ReferenceType.Attachment) {
                                return (
                                    <View>

                                        <AttacmentItem
                                            attachment={ref}
                                        />
                                        {/*  <Text>{ref.title}</Text> */}
                                    </View>
                                )
                            }
                        })
                        : <View />
                }
            </PressableButton>
        </View>
    )
};

export default MessageItemView;