import { useContext, useEffect, useState } from "react";
import { ShopContenxt } from "../contexts/ShopContext";
import Title from "../components/Title";
import { toast } from "react-toastify";
import axios from "axios";
import backendUrl from "../contexts/Backend";

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
const Orders = () => {
  const { token, currency } = useContext(ShopContenxt);
  const [orderData, setOrderData] = useState<Item[]>([]);

  async function loadOrderData() {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "v1/api/order/userorders",
        {},
        { headers: { token } }
      );
      const allOrdersItem: Item[] = [];
      //@ts-expect-error aaa
      response.data.orders.map((order) => {
        order.items.map((item: Item) => {
          item["status"] = order.status;
          item["payment"] = order.payment;
          item["paymentMethod"] = order.paymentMethod;
          item["date"] = order.date;
          allOrdersItem.push(item);
        });
      });
      setOrderData(allOrdersItem.reverse());
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
    loadOrderData();
  }, [token]);
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img
                className="w-16 sm:w-20"
                src={item.image[0]}
                alt={item.name}
              />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg">
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-1">
                  Date:{" "}
                  <span className="text-gray-400">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-1">
                  Payment:{" "}
                  <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm sm:text-base">{item.status}</p>
              </div>
              <button
                className="border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer hover:bg-gray-50"
                onClick={loadOrderData}
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
