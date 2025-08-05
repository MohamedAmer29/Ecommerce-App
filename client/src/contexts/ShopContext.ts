import { createContext } from "react";

export const ShopContenxt = createContext({
  currency: "$",
  search: "",
  showSearch: false,
  setSearch: (e: string) => {
    return e;
  },
  setShowSearch: (e: boolean): boolean => {
    return e;
  },
  cartItems: {},

  //eslint-disable-next-line
  updateQuantity: (id: string, size: string, quantity: number) => {},
  getCartCount: () => 1,
  getCartAmount: () => 0,
  token: "",
  setToken: (e: string) => e,
  setCartItems: (e: object) => e,
  products: [
    {
      name: "",
      description: "",
      price: 0,
      bestseller: false,
      date: Date.now(),
      image: [],

      category: "",
      subCategory: "",
    },
  ],
  delivery_fee: 1,
});
