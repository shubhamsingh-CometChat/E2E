import { useState } from 'react';
import { useSelector } from 'react-redux';
import Groupfunction from '../Functions/Groupfunction';

const AddMembersToGroup = ({ match, history }) => {
  const [uid, setuid] = useState('');
  const E2E = useSelector(({ E2E }) => E2E);
  const UserDetal = useSelector(({ UserDetail }) => UserDetail);
  // console.log(UserDetal);
  const submit = async (e) => {
    e.preventDefault();
    const guid = match.params.guid;
    await Groupfunction.addMemberToGroup(guid, uid, E2E, UserDetal);
    history.push('/allgroups');
  };

  return (
    <>
      <form onSubmit={submit}>
        <div className='form-group'>
          <label htmlFor='NAME'>Enter the UID OF user You want to add</label>
          <input
            type='text'
            className='form-control'
            id='NAME'
            placeholder='ENTER  UID'
            value={uid}
            onChange={(e) => setuid(e.target.value)}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </>
  );
};

export default AddMembersToGroup;
