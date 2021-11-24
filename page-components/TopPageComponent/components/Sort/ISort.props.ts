import { DetailedHTMLProps, HTMLAttributes } from 'react';

export default interface ISortProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sort: SortEnum;
  setSort: (sort: SortEnum) => void;
}
