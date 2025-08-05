interface Item {
  status: string;
  payment: string;
  paymentMethod: string;
  date: number;
  bestseller: boolean;
  category: string;
  subCategory: string;
  description: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  sizes: string[];
  image: string[];
}

export type Order = {
  address: {
    city: string;
    country: StringConstructor;
    email: string;
    firstName: string;
    lastName: string;
    phone: number;
    zipcode: number;
    state: string;
    street: string;
  };
  amount: number;
  date: number;
  items: Item[];
  payment: boolean;
  paymentMethod: string;
  status: string;
  userId: string;
  _id: string;
};
