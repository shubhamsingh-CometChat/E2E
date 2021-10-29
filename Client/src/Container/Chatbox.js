import { useState } from 'react';
import { useEffect } from 'react';
import { CometChat } from '@cometchat-pro/chat';
import {
  PreviousMessage,
  Send,
  RecievedMessage,
} from './../Functions/ChatFunction';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Inbox from '../Component/Inbox';
const Chatbox = ({ history, location, match }) => {
  const [uid, setUid] = useState('');
  const [previousmsg, setpreviousmsg] = useState([]);
  const LOGIN = useSelector(({ Login }) => Login);
  const [mess, setMess] = useState('');
  const stores = useSelector((store) => store);

  const Submit = async (e) => {
    e.preventDefault();
    const E2E = stores;
    const Ethree = E2E.E2E;

    await Send(CometChat, uid, mess, setpreviousmsg, previousmsg, Ethree);
    setMess('');
  };
  useEffect(() => {
    setUid(match.params.uid);
  }, [match]);
  useEffect(() => {
    const E2E = stores;
    const Ethree = E2E?.E2E;
    if (uid) {
      PreviousMessage(CometChat, uid, setpreviousmsg, Ethree);
    }
  }, [uid]);
  useEffect(() => {
    const listnerRecive = async () => {
      const E2E = stores;
      const Ethree = E2E?.E2E;
      await RecievedMessage(CometChat, setpreviousmsg, previousmsg, Ethree);
    };
    listnerRecive();
  }, [previousmsg]);

  return (
    <>
      {LOGIN === true ? (
        <div>
          <div
            style={{
              height: '84vh',
              overflow: 'scroll',
              marginBottom: '30px',
            }}
          >
            {previousmsg.map((message, key) => {
              if (message?.data?.text === undefined) {
                return null;
              }
              // console.log(message.data.entities.receiver?.entity)
              if (
                message?.receiverId === uid &&
                message.data.entities.sender?.entity.uid !== uid
              ) {
                return (
                  <div key={key} style={{ marginTop: '20px' }}>
                    <div style={{ width: '30%', marginLeft: '62%' }}>
                      {message?.text}
                    </div>
                  </div>
                );
              } else {
                // console.log(message.data)
                return (
                  <div key={key} style={{ marginTop: '20px' }}>
                    <div
                      style={{ width: '30%', marginLeft: '2%', color: 'blue' }}
                    >
                      {message?.text}
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <Inbox setMess={setMess} Submit={Submit} value={mess} />
        </div>
      ) : (
        <Redirect to='/login'></Redirect>
      )}
    </>
  );
};

export default Chatbox;
