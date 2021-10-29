import { useState } from 'react';
import { newUser } from './../Functions/Initialize_CometChat';
import { Login } from './../Functions/Initialize_CometChat';
import PRIVATEDATA from './../Private';

import { CometChat } from '@cometchat-pro/chat';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { useEffect } from 'react';
import { initilaize } from './../Functions/Initialize_CometChat';
const SignUp = ({ history, location }) => {
  const LOGIN = useSelector(({ Login }) => Login);
  const Store = useSelector((store) => store);
  const dipsatch = useDispatch();
  const [name, setName] = useState('');
  const [uid, setUid] = useState('');
  const [err, seterror] = useState('');
  const [data, setData] = useState(false);
  const [errs, setError] = useState('');
  useEffect(() => {
    if (LOGIN === false) {
      const { appID, region } = PRIVATEDATA;
      var appSetting = new CometChat.AppSettingsBuilder()
        .subscribePresenceForAllUsers()
        .setRegion(region)
        .build();
      initilaize(CometChat, appID, appSetting, setData, setError);
    }
  }, [LOGIN]);
  const SUBMIT = (e) => {
    if (data === true) {
      e.preventDefault();
      if (location.pathname === '/signup')
        newUser(
          CometChat,
          PRIVATEDATA.Auth_key,
          uid,
          name,
          seterror,
          history,
          dipsatch
        );
      else
        Login(
          CometChat,
          PRIVATEDATA.Auth_key,
          uid,
          seterror,
          history,
          dipsatch
        );
    }
  };

  return (
    <>
      {LOGIN === false ? (
        <form onSubmit={SUBMIT}>
          <div className='form-group'>
            <label htmlFor='USERID'>USER ID</label>
            <input
              type='text'
              className='form-control'
              id='USERID'
              aria-describedby='emailHelp'
              placeholder='ENTER USERID'
              value={uid}
              onChange={(e) => setUid(e.target.value)}
            />
          </div>
          {location.pathname === '/signup' ? (
            <div className='form-group'>
              <label htmlFor='NAME'>NAME</label>
              <input
                type='text'
                className='form-control'
                id='NAME'
                placeholder='ENTER  NAME'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          ) : null}
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
          <div>{err.message}</div>
          <div>{errs}</div>
        </form>
      ) : (
        <Redirect to='/totaluser'></Redirect>
      )}
    </>
  );
};
export default SignUp;
