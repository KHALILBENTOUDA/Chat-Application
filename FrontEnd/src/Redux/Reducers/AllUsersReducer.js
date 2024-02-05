const AllUsersReducer = (state = { AllUsers: null, loading: false, error: false, message: null }, action) => {
      switch (action.type) {
        case "GET_ALL_USERS":
          return { ...state, AllUsers: action.data }; 
        default:
          return state;
      }
    };
    
    export default AllUsersReducer;
    