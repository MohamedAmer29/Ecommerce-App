import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ShopContenxt } from "../contexts/ShopContext";
import axios from "axios";
import backendUrl from "../contexts/Backend";

interface Form {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipcode: number;
  country: string;
  phone: number;
}
const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [formData, setFromData] = useState<Form>({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: 0,
    country: "",
    phone: 0,
  });
  const {
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContenxt);

  function change(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;

    setFromData((data) => ({ ...data, [name]: value }));
  }
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const orderItems = [];

      for (const items in cartItems) {
        //@ts-expect-error aaa
        for (const item in cartItems[items]) {
          //@ts-expect-error aaa
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );

            if (itemInfo) {
              //@ts-expect-error aaa
              itemInfo.size = item;
              //@ts-expect-error aaa
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        //COD
        case "cod":
          {
            const response = await axios.post(
              backendUrl + "v1/api/order/place",
              orderData,
              { headers: { token } }
            );

            toast.success(response.data.message);
            setCartItems({});
            navigate("/orders");
          }
          break;
        default:
          break;
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
  const navigate = useNavigate();
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm]pt-14 min-h-[80vh] border-t
    "
    >
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={change}
            name="firstName"
            value={formData?.firstName}
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={change}
            name="lastName"
            value={formData?.lastName}
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          onChange={change}
          name="email"
          value={formData?.email}
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          required
          onChange={change}
          name="street"
          value={formData?.street}
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={change}
            name="city"
            value={formData?.city}
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={change}
            name="state"
            value={formData?.state}
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={change}
            name="zipcode"
            value={formData?.zipcode === 0 ? "" : formData?.zipcode}
            type="number"
            placeholder="ZIP Code"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={change}
            name="country"
            value={formData?.country}
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          onChange={change}
          name="phone"
          value={formData?.phone === 0 ? "" : formData.phone}
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>
      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          {/* Payment method selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${
                  method === "cod" && "bg-green-400"
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white text-sm px-16 py-3 hover:bg-gray-900 cursor-pointer active:bg-gray-600"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
