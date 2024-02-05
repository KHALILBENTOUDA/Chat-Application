const profileInfo = JSON.parse(localStorage.getItem("profile"));
const UsersProfile = (state = { Users: profileInfo, loading: false, error: false, message: null }, action) => {
      switch (action.type) {
        case "GET_USERS_DATA":
          return { ...state, Users: action.data };
        default:
          return state;
      }
    };
    
export default UsersProfile;
    