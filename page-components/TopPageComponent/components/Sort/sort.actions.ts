import { ProductModel } from '../../../../interfaces/product.interface';

export const enum SortEnum {
  Rating = 'SORT/RATING',
  Price = 'SORT/PRICE'
}

export type sortActionTypes =
  { type: SortEnum } |
  { type: string, payload: { updatedState: ProductModel[] } };

export const ratingSortAction = () => (
  { type: SortEnum.Rating }
)

export const priceSortAction = () => (
  { type: SortEnum.Price }
)

export const updateProductsAction = (updatedProducts: ProductModel[]) => (
  { type: 'UPDATE', payload: { updatedState: updatedProducts } }
)