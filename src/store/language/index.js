import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    return {
      lang: localStorage.getItem('language') ?? 'ru',
    }
  }
  
    //логика для двух языков

  toggleLanguage() {
    const newLang = this.getState().lang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('language', newLang);
    this.setState({
        ...this.getState(),
        lang: newLang,
    })
  }
}

export default Language;