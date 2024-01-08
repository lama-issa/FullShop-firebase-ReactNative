import i18n from '../../language/i18n';

export const setLanguage = (language) => {
  i18n.changeLanguage(language);
  return {
    type: 'SET_LANGUAGE',
    language,
  };
};
