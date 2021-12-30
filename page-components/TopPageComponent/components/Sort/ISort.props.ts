import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { sortActionTypes, SortEnum } from './sort.actions';

export default interface ISortProps extends DetailedHTMLProps<HTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement> {
  sort: SortEnum;
  setSort: (action: sortActionTypes) => void;
}
