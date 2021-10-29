import { CometChat } from '@cometchat-pro/chat';
import { TotalUsers } from './../Functions/Initialize_CometChat';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

const TotalPeople = ({ history }) => {
  const [users, setUsers] = useState([]);
  const Login = useSelector(({ Login }) => Login);
  useEffect(() => {
    if (Login === true) TotalUsers(CometChat, setUsers, history);
  }, [history, Login]);

  const selectUser = (uid) => {
    history.push(`/currentuser/${uid}`);
  };
  return (
    <>
      {Login === true ? (
        <div>
          {users.map((user) => (
            <div key={user.uid} style={{ textAlign: 'center' }}>
              <h1 onClick={() => selectUser(user.uid)}>{user.name}</h1>
            </div>
          ))}
        </div>
      ) : (
        <Redirect to='/login'></Redirect>
      )}
    </>
  );
};
export default TotalPeople;
