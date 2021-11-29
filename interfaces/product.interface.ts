export interface ProductCharacteristic {
  value: string;
  name: string;
}

export interface reviewModel {
  _id: string;
  name: string;
  title: string;
  description: string;
  rating: string;
  createdAt: Date;
}

export interface ProductModel {
  _id: string;
  categories: string[];
  tags: string[];
  title: string;
  link: string;
  price: number;
  credit: number;
  oldPrice: number;
  description: string;
  characteristic: ProductCharacteristic[];
  createdAt: Date;
  updatedAt: Date;
  __v: string;
  image: string;
  initialRating: number;
  reviews: [];
  reviewCount: number;
  reviewAvg?: number;
  advantages: string;
  disadvantages: string;
}