import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Item extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      itemInfo: null,
      isLoading: false,
    }
  }
  // Запрос подробной информации о товаре
  async load(id) {
    try {
      this.setState({
        ...this.getState(),
        isLoading: true
      })
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();
      this.setState({
        ...this.getState(),
        itemInfo: json.result,
      }, 'Загружен товар из АПИ по id');
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        ...this.getState(),
        isLoading: false
      })
    }
  }
  //зачистка информации о товаре
  cleanItemInfo() {
    this.setState({
      ...this.getState(),
      itemInfo: null,
      error: ''
    })
  }
}

export default Item;