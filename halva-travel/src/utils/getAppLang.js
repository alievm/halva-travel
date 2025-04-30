const getAppLang = (rawLang) => {
    const shortLang = rawLang?.split('-')[0]; // ru-RU → ru
    return ['ru', 'en', 'uz'].includes(shortLang) ? shortLang : 'ru';
  };
  
  export default getAppLang;
  