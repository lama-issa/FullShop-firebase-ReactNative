const initialState = {
    selectedLanguage: 'en', // Default language is English
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LANGUAGE':
        return {
          ...state,
          selectedLanguage: action.language,
        };
      default:
        return state;
    }
  };