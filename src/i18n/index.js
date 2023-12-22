import * as translations from './translations';

class I18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.listeners = [];
    const initialLang = config.lang ?? "ru";
    this.lang = initialLang;
    this.services.api.setHeader('Accept-Language', initialLang);
  }

  subscribe(listener) {
    this.listeners.push(listener);

    // функция отписки
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  translate(lang = this.lang, text, plural) {
    let result =
      translations[lang] && text in translations[lang]
        ? translations[lang][text]
        : text;

    if (typeof plural !== "undefined") {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  setLang(lang) {
    this.lang = lang;
    // меняем язык в хедерах запросов сервиса api в этом сервисе тк этот сервис отвечает за мультиязычность
    // и кажется что он должен управлять мультиязычностью всего приложения
    this.services.api.setHeader('Accept-Language', lang);
    for (const listener of this.listeners) {
      listener(this.lang);
    }
  } 

  getLang() {
    return this.lang;
  }
}

export default I18nService;
