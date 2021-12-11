import { DetailedHTMLProps, HTMLAttributes } from 'react';

export default interface IProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  productId: string;
}