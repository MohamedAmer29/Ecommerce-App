import { useContext, useEffect, useState } from "react";

import { ShopContenxt } from "../contexts/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
const BestSeller = () => {
  const { products } = useContext(ShopContenxt);
  const [bestSeller, setBestSeller] = useState([
    {
      _id: "",
      name: "",
      description: "",
      price: 0,
      bestseller: false,
      date: Date.now(),
      image: [],
      sizes: [],
      category: "",
      subCategory: "",
    },
  ]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
          commodi.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            id={item._id}
            key={index}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
