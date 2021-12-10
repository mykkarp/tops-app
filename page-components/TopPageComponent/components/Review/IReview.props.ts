import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { reviewModel } from '../../../../interfaces/product.interface';

export default interface IProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  review: reviewModel;
}