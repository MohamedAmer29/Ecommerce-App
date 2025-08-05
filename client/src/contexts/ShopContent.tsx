import {
  useEffect,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";
import { ShopContenxt } from "./ShopContext";
import type { ProductType } from "./Product";
import { toast } from "react-toastify";
import axios from "axios";
// import { useNavigate, type NavigateFunction } from "react-router";
import backendUrl from "./Backend";

type Shop = {
  currency: string;
  delivery_fee: number;
  products: ProductType[];
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: Dispatch<SetStateAction<boolean>>;
  cartItems: object;
  setCartItems: (e: object) => void;
  token: string;
  getCartCount: () => number;
  getCartAmount: () => number;
  setToken: (token: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  //eslint-disable-next-line
  addToCart: (a: string, b: string) => {};
};

const ShopContextProvider = (porps: PropsWithChildren) => {
  const [search, setSearch] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<object>({});
  const [products, setProducts] = useState<[]>([]);
  const currency = "$";
  const delivery_fee = 10;
  const cartData = structuredClone(cartItems);

  async function getProducts() {
    const response = await axios.get(backendUrl + "v1/api/product/list");

    setProducts(response.data.products);
    try {
      //@ts-expect-error aaa
    } catch (error: Error) {
      console.log(error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.response.data) {
        console.log(error);
        toast.error(error.message);
      } else {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    getProducts();
  }, []);
  async function addToCart(itemId: string, size: string) {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    //@ts-expect-error Can't solve
    if (cartData[itemId]) {
      //@ts-expect-error Can't solve
      if (cartData[itemId][size]) {
        //@ts-expect-error I can't solve it
        cartData[itemId][size] += 1;
      } else {
        //@ts-expect-error I can't solve it
        cartData[itemId][size] = 1;
      }
    } else {
      //@ts-expect-error I can't solve it
      cartData[itemId] = {};
      //@ts-expect-error I can't solve it
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          backendUrl + "v1/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
        //@ts-expect-error aaa
      } catch (error: Error) {
        console.log(error);
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        } else if (error.response.data) {
          console.log(error);
          toast.error(error.message);
        } else {
          console.log(error);
        }
      }
    }
  }

  function getCartCount() {
    let totalCount = 0;
    for (const items in cartItems) {
      //@ts-expect-error can't solve
      for (const item in cartItems[items]) {
        try {
          //@ts-expect-error can't solve
          if (cartItems[items][item] > 0) {
            //@ts-expect-error can't solve
            totalCount += cartItems[items][item];
          }
          //@ts-expect-error aaa
        } catch (error: Error) {
          console.log(error);
          if (error.response.data.message) {
            toast.error(error.response.data.message);
          } else if (error.response.data) {
            console.log(error);
            toast.error(error.message);
          } else {
            console.log(error);
          }
        }
      }
    }
    return totalCount;
  }

  async function updateQuantity(id: string, size: string, quantity: number) {
    const cartData = structuredClone(cartItems);

    //@ts-expect-error can't solve
    cartData[id][size] = quantity;

    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          backendUrl + "v1/api/cart/update",
          { itemId: id, size, quantity },
          { headers: { token } }
        );
        //@ts-expect-error aaa
      } catch (error: Error) {
        console.log(error);
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        } else if (error.response.data) {
          console.log(error);
          toast.error(error.message);
        } else {
          console.log(error);
        }
      }
    }
  }

  async function getCart(token: string) {
    try {
      const response = await axios.post(
        backendUrl + "v1/api/cart/get",
        {},
        {
          headers: { token },
        }
      );
      setCartItems(response.data.cartData);
      //@ts-expect-error aaa
    } catch (error: Error) {
      console.log(error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.response.data) {
        console.log(error);
        toast.error(error.message);
      } else {
        console.log(error);
      }
    }
  }

  function getCartAmount() {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find(
        (product) =>
          //@ts-expect-error aaa
          product._id === items
      );
      //@ts-expect-error can't solve
      for (const item in cartItems[items]) {
        try {
          //@ts-expect-error can't solve
          if (cartItems[items][item] > 0) {
            //@ts-expect-error can't solve
            totalAmount += itemInfo?.price * cartItems[items][item];
          }
          //@ts-expect-error aaa
        } catch (error: Error) {
          console.log(error);
          if (error.response.data.message) {
            toast.error(error.response.data.message);
          } else if (error.response.data) {
            console.log(error);
            toast.error(error.message);
          } else {
            console.log(error);
          }
        }
      }
    }
    return totalAmount;
  }

  const value: Shop = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    setCartItems,
    token,
    setToken,
  };

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token !== null) {
        getCart(token);
        setToken(token);
      }
    }
  }, []);
  return (
    // @ts-expect-error aaa
    <ShopContenxt.Provider value={value}>
      {porps.children}
    </ShopContenxt.Provider>
  );
};

export default ShopContextProvider;
