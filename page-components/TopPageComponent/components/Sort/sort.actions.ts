export const enum SortEnum {
  Rating = 'SORT/RATING',
  Price = 'SORT/PRICE'
}

export type sortActionTypes = { type: SortEnum.Price } | { type: SortEnum.Rating };

export const ratingSortAction = () => (
  { type: SortEnum.Rating }
)

export const priceSortAction = () => (
  { type: SortEnum.Price }
)