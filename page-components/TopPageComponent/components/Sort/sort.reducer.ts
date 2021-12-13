import { ProductModel } from '../../../../interfaces/product.interface';
import { sortActionTypes, SortEnum } from './sort.actions';

export interface sortReducerState {
  sort: SortEnum;
  products: ProductModel[];
}

export const sortReducer = (state: sortReducerState, action: sortActionTypes): sortReducerState => {
  switch (action.type) {
    case SortEnum.Rating:
      return {
        sort: SortEnum.Rating,
        products: state.products.sort((productA, productB) => {
          return productB.initialRating - productA.initialRating;
        })
      }
    case SortEnum.Price:
      return {
        sort: SortEnum.Price,
        products: state.products.sort((productA, productB) => {
          return productB.price - productA.price;
        })
      }
    case 'UPDATE':
      return {
        sort: SortEnum.Rating,
        products: action.payload.updatedState
      }
    default:
      return state;
  }
}