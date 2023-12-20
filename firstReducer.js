const initialState = {
  currentPage: 0,
  totalPages: 1,
  selectedValue: 10,
  searchTerm: "",
  posts: [],
};
const firstReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
      };
    case "SET_RECORDS_PER_PAGE":
      return {
        ...state,
        selectedValue: action.payload,
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "SET_TOTAL_PAGES":
      return {
        ...state,
        totalPages: action.payload,
      };
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        posts: action.payload,
      };
    case "DELETE_DATA_SUCCESS":
      return {
        ...state,
        posts: state.posts.filter((item) => item.id !== action.payload),
      };

    case "EDIT_ROW_SUCCESS":
      const updatedRow = action.payload;
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === updatedRow.id ? updatedRow : post
        ),
      };

    default:
      return state;
  }
};
export default firstReducer;
