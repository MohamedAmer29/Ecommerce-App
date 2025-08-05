import { useParams } from "react-router";

import { useContext, useEffect, useState } from "react";
import { ShopContenxt } from "../contexts/ShopContext";
import type { ProductType } from "../contexts/Product";
import { assets } from "../assets/assets";
import RelativeProducts from "../components/RelativeProducts";

const Product = () => {
  const { id } = useParams();
  const { products, currency, addToCart } = useContext(ShopContenxt);
  const [productData, setProductData] = useState<ProductType>();
  const [image, setImage] = useState<string>("");
  const [size, setSize] = useState("");

  async function fetchProductData() {
    products.map((item) => {
      if (item._id === id) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  }
  useEffect(() => {
    fetchProductData();
  }, [id, products]);
  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-8 sm:gap-12 flex-col sm:flex-row">
        {/* Product Image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                onClick={() => setImage(item)}
                alt="Image"
                className="w-[24%] sm:w-full sm:mb-3 flex shrink-0 cursor-pointer "
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              alt={productData.name + "Image"}
              className="w-full h-auto"
            />
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="star_icon" className="w-3" />
            <img src={assets.star_icon} alt="star_icon" className="w-3" />
            <img src={assets.star_icon} alt="star_icon" className="w-3" />
            <img src={assets.star_icon} alt="star_icon" className="w-3" />
            <img
              src={assets.star_dull_icon}
              alt="star_dull_icon"
              className="w-3"
            />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`cursor-pointer border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500 " : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer hover:bg-gray-900"
            onClick={() => addToCart(productData._id, size)}
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and ex hage policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm ">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
            possimus reprehenderit vero provident nisi ipsam dolores
            exercitationem molestiae blanditiis quo voluptate aliquid
            consectetur natus dolorum accusamus, vitae minus corporis incidunt.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum
            provident facilis sapiente laborum inventore animi. Libero
            aspernatur laborum dolore unde!
          </p>
        </div>
      </div>
      {/* Display related products */}
      <RelativeProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
