import ISortProps from './ISort.props';
import styles from "./Sort.module.css";
import cn from 'classnames';
import SortIcon from './Sort.svg';
import { priceSortAction, ratingSortAction, SortEnum } from './sort.actions';

export function Sort({ sort, setSort, className, ...props }: ISortProps): JSX.Element {
  return (
    <div
      className={cn(className, styles.sort)}
      {...props}
    >
      <button
        type='button'
        onClick={() => setSort(ratingSortAction())}
        className={cn({
          [styles.active]: sort === SortEnum.Rating,
        })}
      >
        <SortIcon />По рейтингу
      </button>
      <button
        type='button'
        onClick={() => setSort(priceSortAction())}
        className={cn({
          [styles.active]: sort === SortEnum.Price,
        })}
      >
        <SortIcon />По цене
      </button>
    </div>
  );
}