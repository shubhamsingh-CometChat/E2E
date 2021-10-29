const initialState = {};
const E2E = (state, action) => {
  state = state || initialState;
  switch (action.type) {
    case 'E2E':
      return action.payload;
    case 'NOTE2E':
      return {};
    default:
      return state;
  }
};

export default E2E;
