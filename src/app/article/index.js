import { memo, useCallback, useEffect } from 'react';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import ItemInformation from '../../components/item-information';
import { useParams } from "react-router-dom";
import Loader from '../../components/loader';
import ErrorMessage from '../../components/error-message';

function Article() {
    const { id } = useParams();
    const store = useStore();

    useEffect(() => {
        store.actions.item.load(id);

        return () => {
            store.actions.item.cleanItemInfo();
        };

    }, [id])

    const select = useSelector(state => ({
        item: state.item.itemInfo,
        amount: state.basket.amount,
        isLoading: state.item.isLoading,
        title: state.item.itemInfo?.title,
        sum: state.basket.sum
    }));
    const callbacks = {
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    }

    const content = select.item ? <ItemInformation item={select.item} onAdd={callbacks.addToBasket} />
    : <ErrorMessage errorText='Товар не найден' />

    return (
        <PageLayout>
            <Head title={select.title} />
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                sum={select.sum} />
            {
                select.isLoading
                    ? <Loader />
                    : content
            }

        </PageLayout>

    );
}

export default memo(Article);
