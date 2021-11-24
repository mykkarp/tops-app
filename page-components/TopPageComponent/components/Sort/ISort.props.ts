import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { sortActionTypes, SortEnum } from './sort.actions';

export default interface ISortProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sort: SortEnum;
  setSort: (action: sortActionTypes) => void;
}
