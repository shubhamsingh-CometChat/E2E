import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Group from './../Functions/Groupfunction';

const CreateGroup = ({ history }) => {
  const [groupId, setGroupID] = useState('');
  const [groupName, setGroupName] = useState('');
  const store = useSelector(({ UserDetail, E2E }) => ({ UserDetail, E2E }));
  // console.log(groupId, groupName);
  useEffect(() => {}, []);
  const submit = async (e) => {
    e.preventDefault();
    const group = await Group.createGroup(groupId, groupName, store.E2E);
    console.log(group);
    history.push('/allgroups');
  };
  return (
    <>
      <form onSubmit={submit}>
        <div className='form-group'>
          <label htmlFor='NAME'>GROUP ID</label>
          <input
            type='text'
            className='form-control'
            id='NAME'
            placeholder='ENTER  GROUP ID'
            value={groupId}
            onChange={(e) => setGroupID(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='NAME'>GROUP NAME</label>
          <input
            type='text'
            className='form-control'
            id='NAME'
            placeholder='ENTER  GROUP ID'
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </>
  );
};

export default CreateGroup;
