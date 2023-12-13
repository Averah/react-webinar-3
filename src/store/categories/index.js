import StoreModule from "../module";

class CategoriesState extends StoreModule {

    initState() {
        return {
            items: [],
            error: '',
            waiting: false
        }
    }

    async load() {
        this.setState({
            items: [],
            waiting: true
        });

        try {
            const response = await fetch(`api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
            const json = await response.json();
            this.setState({
                items: json.result.items,
                waiting: false
            }, 'Загружены категории из АПИ');

        } catch (e) {
            this.setState({
                data: {},
                error: error.message,
                waiting: false
            });
        }
    }
}

export default CategoriesState;
