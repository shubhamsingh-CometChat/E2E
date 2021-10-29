import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GROUP from './../Functions/Groupfunction';

const AllGroups = ({ history }) => {
  const [ownerGroup, setownerGroup] = useState([]);
  const [JoinedGroup, setJoinedGroup] = useState([]);
  const userDetail = useSelector(({ UserDetail }) => UserDetail);
  const E2E = useSelector(({ E2E }) => E2E);
  useEffect(() => {
    (async () => {
      const group = await GROUP.AllGroup(userDetail);
      setownerGroup(group);
      const JoinedGroup = await GROUP.allJoinedGroup();
      setJoinedGroup(JoinedGroup);
    })();
  }, []);
  const sendingGroup = (groupUid) => {
    history.push(`/currentgroup/${groupUid}`);
  };
  const joinGroup = async (guid) => {
    history.push(`/joingroup/${guid}`);
  };
  return (
    <>
      <h2 style={{ background: 'red' }}>Owner of groups </h2>
      <h3>Click here to add members in your group</h3>
      {ownerGroup.map((group, key) => {
        return (
          <h3 onClick={() => joinGroup(group.guid)} key={key}>
            {key + 1}:{group.name}
          </h3>
        );
      })}
      <h1>All groups you join</h1>
      <h2 style={{ background: 'red' }}>Click on group to start chat</h2>
      {JoinedGroup.map((group, key) => {
        return (
          <h3 onClick={() => sendingGroup(group.guid)} key={key}>
            {key + 1}:{group.name}
          </h3>
        );
      })}
    </>
  );
};
export default AllGroups;
