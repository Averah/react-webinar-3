import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      itemsTotalCount: 0,
      itemsLimitPerPage: 10,
      isLoading: false,
    }
  }

  async load(itemsLimit = 10, page = 1) {

    try {
      this.setState({
        ...this.getState(),
        isLoading: true,
        currentPage: page
      })
      const response = await fetch(`/api/v1/articles?limit=${itemsLimit}&skip=${itemsLimit * (this.getState().currentPage - 1)}&fields=items(_id, title, price),count`);
      const json = await response.json();
      this.setState({
        ...this.getState(),
        list: json.result.items,
        itemsTotalCount: json.result.count
      }, 'Загружены товары из АПИ');
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        ...this.getState(),
        isLoading: false
      })
    }
  }

  addItemToList(item) {
    this.setState({
      ...this.getState(),
      list: [...this.getState().list, item]
    })
  }
}

export default Catalog;
