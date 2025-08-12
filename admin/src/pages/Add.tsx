import { useState, type ChangeEvent, type FormEvent } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
type Props = {
  token: string;
};
const Add = ({ token }: Props) => {
  const [image1, setImage1] = useState<File>();
  const [image2, setImage2] = useState<File>();
  const [image3, setImage3] = useState<File>();
  const [image4, setImage4] = useState<File>();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("Men");
  const [subCategory, setSubCategory] = useState<string>("Topwear");
  const [bestseller, setBestseller] = useState<boolean>(false);
  const [sizes, setSizes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", String(price));
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", String(bestseller));
      formData.append("sizes", JSON.stringify(sizes));
      // eslint-disable-next-line
      image1 && formData.append("image1", image1);
      // eslint-disable-next-line
      image2 && formData.append("image2", image2);
      // eslint-disable-next-line
      image3 && formData.append("image3", image3);
      // eslint-disable-next-line
      image4 && formData.append("image4", image4);
      const response = await axios.post(
        backendUrl + "v1/api/product/add",
        formData,
        { headers: { token } }
      );
      toast.success(response.data.message);
      setName("");
      setDescription("");
      setBestseller(false);
      setCategory("Men");
      setSubCategory("Topwear");
      setImage1(undefined);
      setImage2(undefined);
      setImage3(undefined);
      setImage4(undefined);
      setPrice(0);
      setSizes([]);
      setIsSubmitting(false);

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
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col w-full items-start gap-3">
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20 cursor-pointer"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="upload_area"
            />
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setImage1((e.target as HTMLInputElement).files![0])
              }
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20 cursor-pointer"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="upload_area"
            />
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setImage2((e.target as HTMLInputElement).files![0])
              }
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20 cursor-pointer"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="upload_area"
            />
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setImage3((e.target as HTMLInputElement).files![0])
              }
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20 cursor-pointer"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="upload_area"
            />
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setImage4((e.target as HTMLInputElement).files![0])
              }
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
        <div className="w-full">
          <p className="mb-2">Product name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Type here"
            required
          />
        </div>
        <div className="w-full">
          <p className="mb-2">Product description</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full max-w-[500px] px-3 py-2"
            placeholder="Write content here"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Product category</p>
            <select
              className="w-full px-3 py-2"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Men">Men</option>
              <option value="Women">women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Product subcategory</p>
            <select
              className="w-full px-3 py-2"
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div>
            <p className="mb-2">Product Price</p>
            <input
              onChange={(e) => setPrice(Number(e.target.value))}
              value={price}
              className="w-full px-3 py-2 sm:w-[120px]"
              type="number"
              placeholder="25"
            />
          </div>
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="gap-2 flex mt-2">
        <input
          type="checkbox"
          id="bestseller"
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      <button
        type="submit"
        onClick={() => setTimeout(() => setIsSubmitting(true), 100)}
        disabled={isSubmitting}
        className="w-28 disabled:bg-gray-400 disabled:cursor-not-allowed py-3 mt-4 rounded-lg hover:bg-gray-900 active:bg-gray-500 bg-black text-white cursor-pointer "
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
