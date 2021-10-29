import allFunctions from '../function';

export const initilaize = (CometChat, appID, appSetting, setData, setError) => {
  CometChat.init(appID, appSetting).then(
    () => {
      console.log('Initialization completed successfully');
      setData(true);
      setError('');
    },
    (error) => {
      console.log('Initialization failed with error:', error);
      setData(false);
      setError(error);
    }
  );
};

export const newUser = (
  CometChat,
  authKey,
  uid,
  name,
  seterror,
  history,
  dipsatch
) => {
  var user = new CometChat.User(uid);

  user.setName(name);

  CometChat.createUser(user, authKey).then(
    (user) => {
      console.log('user created', user);

      seterror('');
      dipsatch({
        type: 'addDetail',
        payload: user,
      });
    },
    (error) => {
      console.log('error', error);
      seterror(error);
      dipsatch({
        type: 'removeDetail',
      });
    }
  );
};

export const Login = (CometChat, authKey, UID, seterror, history, dipsatch) => {
  CometChat.login(UID, authKey).then(
    async (user) => {
      console.log('Login Successful:', { user });
      const data = await allFunctions.ClientSetUP(UID);
      dipsatch({
        type: 'E2E',
        payload: data,
      });
      seterror('');
      dipsatch({
        type: 'addDetail',
        payload: user,
      });
      dipsatch({
        type: 'login',
      });
    },
    (error) => {
      console.log('Login failed with exception:', { error });
      seterror(error.message);
      dipsatch({
        type: 'removeDetail',
      });
    }
  );
};

export const TotalUsers = (CometChat, setUsers, history) => {
  var limit = 30;
  var usersRequest = new CometChat.UsersRequestBuilder()
    .setLimit(limit)
    .build();

  usersRequest.fetchNext().then(
    (userList) => {
      setUsers(userList);
    },
    (error) => {
      console.log(error);
      history.push('/login');
    }
  );
};

export const Logout = (CometChat, history, dispatch, Ethree) => {
  CometChat.logout().then(
    async () => {
      await allFunctions.logoutCurrentUser(Ethree.Register);
      dispatch({
        type: 'logout',
      });
      console.log('Logout completed successfully');

      history.push('/login');
    },
    (error) => {
      //     sessionStorage.clear('sessionId')
      //   localStorage.clear()
      //Logout failed with exception
      console.log('Logout failed with exception:', { error });
    }
  );
};
