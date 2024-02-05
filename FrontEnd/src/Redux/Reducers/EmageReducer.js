const EmageReducer = (
  state = {
    emageProfile: null,
    loading: false,
    Cover: null,
    Post: null,
    message: null,
    AllPosts: null,
  },
  action
) => {
  switch (action.type) {
    case "PROFILE_EMAGE_SUCCESS":
      return { ...state, emageProfile: action.data };
    case "PROFILE_COVER_SUCCESS":
      return { ...state, Cover: action.data };
    case "PROFILE_ALLPOSTS_SUCCESS":
      return { ...state, Post: action.data };
    default:
      return state;
  }
};
export default EmageReducer;
