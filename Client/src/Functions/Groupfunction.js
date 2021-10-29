import { CometChat } from '@cometchat-pro/chat';
import { EThree } from '@virgilsecurity/e3kit-browser';
const createGroup = async (GUID, groupName, E2E) => {
  try {
    var groupType = CometChat.GROUP_TYPE.PUBLIC;
    var password = '';

    var group = new CometChat.Group(GUID, groupName, groupType, password);

    const newGroup = await CometChat.createGroup(group);
    if (Object.keys(E2E).length > 0) {
      const eThree = E2E.Register;
      const groupId = `my_new_group_uid_${newGroup.guid}`;
      const participants = await eThree.findUsers([newGroup.owner]);
      const group = await eThree.createGroup(groupId, participants);
      // Group created and saved locally
      return group;
    }
    return newGroup;
  } catch (e) {
    console.log(e);
  }
};

const AllGroup = async (userDetail) => {
  const uid = userDetail.uid;
  let limit = 30;
  let groupsRequest = new CometChat.GroupsRequestBuilder()
    .setLimit(limit)
    .build();

  const groups = await groupsRequest.fetchNext();
  console.log(groups, uid);

  return groups.filter((group) => group.owner == uid);
};

const groupInformation = async (GUID) => {
  const group = await CometChat.getGroup(GUID);
  return group;
};
const JoinGroup = async (GUID, uid, E2E) => {
  //   var GUID = 'GUID';
  const eThree = E2E.Register;
  const groupId = `my_new_group_uid_${GUID}`;
  const newParticipant = await eThree.findUsers(uid);

  var password = '';
  var groupType = CometChat.GROUP_TYPE.PUBLIC;

  const addMembergroup = await CometChat.joinGroup(GUID, groupType, password);
  const owner = addMembergroup.owner;
  const Card = await eThree.findUsers(owner);
  const group = await eThree.loadGroup(groupId, Card);
  console.log(group);
  await group.add(newParticipant);
  await group.update;
  console.log(group);
  return addMembergroup;
};
const allJoinedGroup = async () => {
  let limit = 30;
  let groupsRequest = new CometChat.GroupsRequestBuilder()
    .setLimit(limit)
    .joinedOnly(true)
    .build();
  const groups = await groupsRequest.fetchNext();
  console.log(groups);
  return groups;
};

const addMemberToGroup = async (GUID, UID, E2E, userDetail) => {
  const eThree = E2E.Register;
  let membersList = [
    new CometChat.GroupMember(UID, CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT),
  ];

  const data = await CometChat.addMembersToGroup(GUID, membersList, []);
  const groupId = `my_new_group_uid_${GUID}`;
  const Card = await eThree.findUsers(userDetail.uid);
  const group = await eThree.loadGroup(groupId, Card);
  console.log(group);

  const newParticipant = await eThree.findUsers(UID);
  const groupdata = await group.add(newParticipant);

  await group.update();
  console.log(GUID, UID, E2E);
};

const fetchGroupMessages = async (guid, E2E, uid) => {
  try {
    const eThree = E2E.Register;
    let GUID = guid;
    let limit = 30;
    const groupId = `my_new_group_uid_${guid}`;
    let messagesRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(GUID)
      .setLimit(limit)
      .build();
    const message = await messagesRequest.fetchPrevious();
    // const groupId = `my_new_group_uid_ ${guid}`;
    const currentGroup = await CometChat.getGroup(GUID);

    const Card = await eThree.findUsers(currentGroup.owner);
    const group = await eThree.loadGroup(groupId, Card);
    let messages = message.map(async (m) => {
      try {
        const messageSender = await eThree.findUsers(m.sender.uid);

        const decrypted = await group.decrypt(m?.text, messageSender);
        m.text = decrypted;
        return m;
      } catch (e) {
        console.log(e);
        return m;
      }
    });
    const messagesPromise = await Promise.all(messages).then((d) => d);
    // const encrypted = await group.encrypt(messageToEncrypt);

    return messagesPromise;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const SendGroupMessage = async (GUID, messageText, E2E, userDetail) => {
  const eThree = E2E.Register;
  const groupId = `my_new_group_uid_${GUID}`;
  const uid = userDetail.uid;
  // console.log(uid, 'djdjdjdj');
  // const Card = await eThree.findUsers(uid);
  // const group = await eThree.getGroup(groupId);
  // const currentGroup = await CometChat.getGroup(GUID);
  const group = await eThree.getGroup(groupId);
  // const Card = await eThree.findUsers(currentGroup.owner);
  // const group = await eThree.loadGroup(groupId, Card);

  const messageToEncrypt = messageText;
  const encrypted = await group.encrypt(messageToEncrypt);
  let receiverID = GUID;
  let receiverType = CometChat.RECEIVER_TYPE.GROUP;
  let textMessage = new CometChat.TextMessage(
    receiverID,
    encrypted,
    receiverType
  );

  const newMessage = await CometChat.sendMessage(textMessage);
  newMessage.text = messageText;
  return newMessage;
};

const ReciveGroupMessage = async (
  setPreviousMessage,
  E2E,
  userDetail,
  GUID
) => {
  // const currentGroup = await CometChat.getGroup(GUID);
  let listenerID = '02';

  CometChat.addMessageListener(
    listenerID,
    new CometChat.MessageListener({
      onTextMessageReceived: async (textMessage) => {
        try {
          const eThree = E2E.Register;

          const groupId = `my_new_group_uid_${GUID}`;
          // const currentGroup = await CometChat.getGroup(GUID);
          const group = await eThree.getGroup(groupId);
          // const Card = await eThree.findUsers(currentGroup.owner);
          // const group = await eThree.loadGroup(groupId, Card);
          const messageSender = await eThree.findUsers(textMessage.sender.uid);
          // console.log(messageSender, 'carddd');
          // const decrypted = await group.decrypt(textMessage?.text, messageSender);
          // textMessage.text = decrypted;
          const decrypted = await group.decrypt(
            textMessage.text,
            messageSender
          );
          textMessage.text = decrypted;

          setPreviousMessage((s) => [...s, textMessage]);
        } catch (e) {}
      },

      onMediaMessageReceived: (mediaMessage) => {
        console.log('Media message received successfully', mediaMessage);
      },
      onCustomMessageReceived: (customMessage) => {
        console.log('Custom message received successfully', customMessage);
      },
    })
  );
};
export default {
  createGroup,
  AllGroup,
  groupInformation,
  JoinGroup,
  addMemberToGroup,
  allJoinedGroup,
  fetchGroupMessages,
  SendGroupMessage,
  ReciveGroupMessage,
};
