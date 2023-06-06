export interface IBook {
  id: string;
  author: string;
  title: string;
  description: string;
  price: number;
  category: number[];
  poster: string;
  pages: object[];
}

export interface ICategory {
  category: string;
}
