import ISortProps from './ISort.props';
import styles from "./Sort.module.css";
import cn from 'classnames';
import SortIcon from './Sort.svg';
import { priceSortAction, ratingSortAction, SortEnum } from './sort.actions';

export function Sort({ sort, setSort, className, ...props }: ISortProps): JSX.Element {
  return (
    <fieldset
      className={cn(className, styles.sort)}
      {...props}
    >
      <label>
        <input
          type='radio'
          onClick={() => setSort(ratingSortAction())}
          aria-selected={sort === SortEnum.Rating}
          name='sorting'
        />
        <span
          className={cn({
            [styles.active]: sort === SortEnum.Rating,
          })}
        >
          <SortIcon />По рейтингу
        </span>
      </label>
      <label>
        <input
          type='radio'
          onClick={() => setSort(priceSortAction())}
          aria-selected={sort === SortEnum.Price}
          name='sorting'
        />
        <span
          className={cn({
            [styles.active]: sort === SortEnum.Price,
          })}
        >
          <SortIcon />По цене
        </span>
      </label>
    </fieldset>
  );
}