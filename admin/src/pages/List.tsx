import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import currency from "../context/Currency";
interface List {
  image: string[];
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  subCategory: string;
  sizes: string[];
  bestseller: boolean;
}
interface Props {
  token: string;
}
const backend = import.meta.env.VITE_BACKEND_URL;
const List = ({ token }: Props) => {
  const [list, setList] = useState<List[]>([]);

  async function fetchList() {
    try {
      const response = await axios.get(backend + "v1/api/product/list");
      setList(response.data.products);
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
  async function removeProduct(id: string) {
    try {
      await axios.post(
        backend + "v1/api/product/remove",
        { id },
        {
          headers: { token },
        }
      );

      toast.success("Product removed");
      await fetchList();
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
    fetchList();
  }, []);
  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* List Table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* Product List */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            <img
              className="w-12"
              src={item.image[0]}
              alt={item.name + " image"}
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p
              className="text-right md:text-center cursor-pointer text-lg"
              onClick={() => removeProduct(item._id)}
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
