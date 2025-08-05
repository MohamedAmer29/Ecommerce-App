interface ProductType {
  _id: string;
  bestseller: boolean;
  category: string;
  date: number;
  description: string;
  image: string[];
  name: string;
  price: number;
  sizes: string[];
  subCategory: string;
}

export type { ProductType };
