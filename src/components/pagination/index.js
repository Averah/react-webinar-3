import { memo } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Pagination({ itemsTotalCount, currentPage = 1, itemsLimitPerPage }) {

    const cn = bem('Pagination');

    const pagesCount = Math.ceil(itemsTotalCount / itemsLimitPerPage);
    const firstPage = 1;
    const lastPage = pagesCount;

    // если страница больше общего количества - ничего не рендерим
    if (pagesCount < currentPage) {
        return null;
    }

    let centerPagesRange = [];

    if (currentPage === firstPage) {
        // обрезаем конец слайсом если страниц меньше 3
        centerPagesRange = [currentPage, currentPage + 1, currentPage + 2].slice(0, lastPage);
    } else if (currentPage === lastPage) {
        // обрезаем начало слайсом если страниц меньше 3
        centerPagesRange = [currentPage - 2, currentPage - 1, currentPage].slice(pagesCount < 3 ? 1 : 0);
    } else {
        centerPagesRange = [currentPage - 1, currentPage, currentPage + 1];
    }

    const isShowLeftDots = centerPagesRange[0] - firstPage > 1;
    const isShowFirstPage = centerPagesRange[0] !== firstPage && centerPagesRange[1] !== firstPage;

    const isShowRightDots = lastPage - centerPagesRange[2] > 1;
    const isShowLastPage = !centerPagesRange.includes(lastPage);


    return (
        <div className={cn()}>
            {isShowFirstPage && (
                <Link to={`/page/${firstPage}`} className={cn('page')}>
                    {firstPage}
                </Link>
            )}
            {isShowLeftDots && (
                <div className={cn('dots')}>...</div>
            )}
            {!!centerPagesRange.length &&
                centerPagesRange.map((page) => {
                    return (
                        <Link to={`/page/${page}`} className={`${cn('page')} ${currentPage === page ? cn('page_active') : ''}`}>
                            {page}
                        </Link>)
                })}
            {isShowRightDots && (
                <div className={cn('dots')}>...</div>
            )}
            {isShowLastPage && (
                <Link to={`/page/${lastPage}`} className={cn('page')}>
                    {lastPage}
                </Link>
            )}
        </div>
    );
};

export default memo(Pagination);

Pagination.PropTypes = {
    itemsTotalCount: PropTypes.number,
    currentPage: PropTypes.number,
    itemsLimitPerPage: PropTypes.number
};

Pagination.defaultProps = {
    itemsTotalCount: 0,
    currentPage: 1,
    itemsLimitPerPage: 10
};