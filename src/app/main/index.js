import { memo, useCallback, useEffect } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { useParams } from "react-router-dom";
import Loader from '../../components/loader';
import ErrorMessage from '../../components/error-message';
import { useTranslation } from '../../store/use-translation';

function Main() {

  const select = useSelector(state => ({
    list: state.catalog.list,
    itemsTotalCount: state.catalog.itemsTotalCount,
    itemsLimitPerPage: state.catalog.itemsLimitPerPage,
    currentPage: state.catalog.currentPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
    isLoading: state.catalog.isLoading,
  }));

  const { pageNumber } = useParams();
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load(select.itemsLimitPerPage, +pageNumber);
  }, [pageNumber]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} />
    }, [callbacks.addToBasket]),
  };

  const t = useTranslation();

  const content = select.list.length ? (
    <>
      <List list={select.list} renderItem={renders.item} />
      <Pagination itemsTotalCount={select.itemsTotalCount} currentPage={select.currentPage} itemsLimitPerPage={select.itemsLimitPerPage} />
    </>
  )
    : <ErrorMessage errorText={t('itemsNotFound')} />

  return (
    <PageLayout>
      <Head title={t('shop')} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum} />
      {select.isLoading ? <Loader />
        :
        content

      }


    </PageLayout>

  );
}

export default memo(Main);
