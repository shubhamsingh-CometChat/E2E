import { useSelector, useSelector } from 'react-redux';
import allFunctions from '../function';

const SendMessage = ({ message }) => {
  const E2E = useSelector(({ E2E }) => E2E);
  console.log(E2E, 'dijfijf');
  return (
    <>
      <div style={{ marginTop: '20px' }}>
        <div style={{ width: '30%', marginLeft: '60%', color: 'blue' }}>
          {message}
        </div>
      </div>
    </>
  );
};

export default SendMessage;
