import TotalPeople from '../Container/TotalPeople';
import SignUp from './../Container/SignUp';
import Chatbox from '../Container/Chatbox';
import { Redirect } from 'react-router';
import CreateGroup from '../Container/CreateGroup';
import GroupBox from '../Container/Groupchatbox';
import AllGroups from '../Container/Allgroups';
import AddMembersToGroup from '../Container/AddMemberToGroup';
const HOME = () => {
  return (
    <>
      <Redirect to='/signup'></Redirect>
    </>
  );
};
const Routes = [
  { exact: true, path: '/', component: HOME },
  { exact: true, path: '/signup', component: SignUp },
  { exact: true, path: '/login', component: SignUp },
  { exact: true, path: '/totalUser', component: TotalPeople },
  { exact: true, path: '/creategroup', component: CreateGroup },
  { exact: true, path: '/allgroups', component: AllGroups },
  { exact: true, path: '/currentgroup/:guid', component: GroupBox },
  { exact: true, path: '/currentuser/:uid', component: Chatbox },
  { expect: true, path: '/joingroup/:guid', component: AddMembersToGroup },
];
export default Routes;
