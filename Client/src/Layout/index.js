import { useHistory } from 'react-router-dom';
import { CometChat } from '@cometchat-pro/chat';
import { Logout } from '../Functions/Initialize_CometChat';
import { useDispatch, useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const LOGIN = useSelector(({ Login }) => Login);
  const Store = useSelector((store) => store);
  const history = useHistory();
  return (
    <>
      {LOGIN === false ? (
        <nav className='navbar navbar-light bg-light'>
          <div className='container-fluid'>
            <span
              className='navbar-brand mb-0 h1'
              onClick={() => history.push('/login')}
            >
              Login
            </span>
            <span
              className='navbar-brand mb-0 h1'
              onClick={() => history.push('/signup')}
            >
              SignIn
            </span>
          </div>
        </nav>
      ) : (
        <nav className='navbar navbar-light bg-light'>
          <div className='container-fluid'>
            <span
              className='navbar-brand mb-0 h1'
              onClick={() => history.push('/totaluser')}
            >
              All Users
            </span>
            <span
              className='navbar-brand mb-0 h1'
              onClick={() => history.push('/creategroup')}
            >
              createGroup
            </span>
            <span
              className='navbar-brand mb-0 h1'
              onClick={() => history.push('/allgroups')}
            >
              AllGroup
            </span>
            <span
              className='navbar-brand mb-0 h1'
              onClick={() => Logout(CometChat, history, dispatch, Store?.E2E)}
            >
              Logout
            </span>
          </div>
        </nav>
      )}
      {children}
    </>
  );
};
export default Layout;
