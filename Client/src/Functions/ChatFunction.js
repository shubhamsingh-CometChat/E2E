import allFunctions from '../function';

export const PreviousMessage = (CometChat, UID, setpreviousmsg, Ethree) => {
  var limit = 50;

  var messagesRequest = new CometChat.MessagesRequestBuilder()
    .setLimit(limit)
    .setUID(UID)
    .build();

  messagesRequest.fetchPrevious().then(
    async (previousmsg) => {
      // console.log('Message list fetched:', messages);
      const previousmsgs = await previousmsg.map(async (msg) => {
        try {
          if (msg?.text != undefined && msg?.type == 'text') {
            const message = await allFunctions.decryptMessages(
              Ethree.Register,
              msg.text,
              msg.sender.uid
            );
            msg.text = message;
          }
          return msg;
        } catch (e) {
          console.log(msg);
        }
      });
      const data = await Promise.all(previousmsgs).then((d) => {
        return d;
      });
      setpreviousmsg([...data]);
      // setpreviousmsg(messages);
    },
    (error) => {
      console.log('Message fetching failed with error:', error);
    }
  );
};

export const Send = async (
  CometChat,
  receiverID,
  messageText,
  setpreviousmsg,
  previousmsg,
  Ethree
) => {
  const data = await allFunctions.SendMessages(
    receiverID,
    messageText,
    Ethree.Register,
    Ethree.userId
  );
  var receiverType = CometChat.RECEIVER_TYPE.USER;

  var textMessage = new CometChat.TextMessage(
    receiverID,
    data.body,
    receiverType
  );

  CometChat.sendMessage(textMessage).then(
    async (message) => {
      // const previousmsgs = await previousmsg.map(async (msg) => {
      //   try {
      //     if (msg?.text != undefined && msg?.type == 'text') {
      //       const message = await allFunctions.decryptMessages(
      //         Ethree.Register,
      //         msg.text,
      //         msg.sender.uid
      //       );
      //       msg.text = message;
      //     }
      //     return msg;
      //   } catch (e) {
      //     console.log(msg);
      //   }
      // });
      const currentMessage = await allFunctions.decryptMessages(
        Ethree.Register,
        message.text,
        message.sender.uid
      );
      // const data = await Promise.all(previousmsgs).then((d) => {
      //   return d;
      // });
      message.text = currentMessage;
      setpreviousmsg([...previousmsg, message]);
    },
    (error) => {
      console.log('Message sending failed with error:', error);
    }
  );
};

export const RecievedMessage = (
  CometChat,
  setpreviousmsg,
  previousmsg,
  Ethree
) => {
  console.log(Ethree);
  var listenerID = '01';

  CometChat.addMessageListener(
    listenerID,
    new CometChat.MessageListener({
      onTextMessageReceived: async (message) => {
        const currentMessage = await allFunctions.decryptMessages(
          Ethree.Register,
          message.text,
          message.sender.uid
        );
        message.text = currentMessage;
        console.log(message);
        setpreviousmsg([...previousmsg, message]);
        // Handle text message
      },
    })
  );
};
