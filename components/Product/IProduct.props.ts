import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { ProductModel } from '../../interfaces/product.interface';

export default interface IProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: ProductModel;
}