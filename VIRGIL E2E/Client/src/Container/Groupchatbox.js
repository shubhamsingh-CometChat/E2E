import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Inbox from '../Component/Inbox';
import GROUP from './../Functions/Groupfunction';
const GroupBox = ({ history, location, match }) => {
  const [previousMessage, setPreviousMessage] = useState([]);
  const userDetail = useSelector(({ UserDetail }) => UserDetail);
  const [sendmessage, setSendMessage] = useState('');
  const store = useSelector(({ E2E }) => E2E);
  const submit = async (e) => {
    const guid = match.params.guid;
    e.preventDefault();
    const newMessage = await GROUP.SendGroupMessage(
      guid,
      sendmessage,
      store,
      userDetail
    );
    setPreviousMessage([...previousMessage, newMessage]);
    setSendMessage('');
  };
  useEffect(() => {
    (async () => {
      const guid = match.params.guid;
      console.log(guid);
      const groupData = await GROUP.fetchGroupMessages(
        guid,
        store,
        userDetail.uid
      );
      setPreviousMessage(groupData);
      await GROUP.ReciveGroupMessage(
        setPreviousMessage,
        store,
        userDetail,
        guid
      );
    })();
  }, []);

  return (
    <>
      <div style={{ height: '84vh', overflow: 'scroll' }}>
        {previousMessage.map((message, key) => {
          if (message?.type == 'groupMember') {
            return (
              <h2 style={{ textAlign: 'center' }} key={key}>
                {message.message}
              </h2>
            );
          }
          if (message.type == 'text') {
            if (userDetail?.uid === message?.sender?.uid) {
              return (
                <div key={key} style={{ width: '100%', height: '30px' }}>
                  <h4 style={{ width: '30%', marginLeft: '60%' }}>
                    {message?.text}
                  </h4>
                </div>
              );
            } else {
              return (
                <div key={key}>
                  <div
                    style={{ display: 'inline-block', background: 'yellow' }}
                  >
                    {message?.sender?.name}
                  </div>
                  <h4
                    style={{
                      width: '30%',
                      height: '30px',
                      marginLeft: '2%',
                      color: 'blue',
                    }}
                  >
                    {message.text}
                  </h4>
                </div>
              );
            }
          }
        })}
      </div>
      <div style={{ position: 'absolute', bottom: '1%' }}>
        <Inbox
          setMess={setSendMessage}
          Submit={submit}
          value={sendmessage}
          group={'group'}
        />
      </div>
    </>
  );
};

export default GroupBox;
// setMess, Submit, value
