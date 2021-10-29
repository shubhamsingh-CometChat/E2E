const Inbox = ({ setMess, Submit, value, group }) => {
  const style =
    group === undefined
      ? { position: 'absolute', top: '88vh', width: '100vw' }
      : { position: 'absolute', bottom: '0vh', width: '100vw' };
  return (
    <>
      <form style={style} onSubmit={Submit}>
        <div className='mb-3'>
          <input
            type='text'
            className='form-control'
            aria-describedby='message'
            required
            onChange={(e) => {
              setMess(e.target.value);
            }}
            value={value}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Send
        </button>
      </form>
    </>
  );
};

export default Inbox;
