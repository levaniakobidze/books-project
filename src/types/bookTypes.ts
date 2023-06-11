export interface IBook {
  id: string;
  author: string;
  title: string;
  description: string;
  price: number;
  categories: number[];
  poster: string;
  pages: object[];
}

export interface ICategory {
  _id: string;
  title: string;
  id: number;
}
