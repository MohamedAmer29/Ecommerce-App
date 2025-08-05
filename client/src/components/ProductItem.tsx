import { useContext } from "react";
import { ShopContenxt } from "../contexts/ShopContext";
import { Link } from "react-router";

type Prop = {
  id: string;
  image: string[];
  name: string;
  price: number;
};

const ProductItem = ({ id, image, name, price }: Prop) => {
  const { currency } = useContext(ShopContenxt);

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          src={image[0]}
          alt={name}
          className="hover:scale-110 transition ease-in-out"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="font-medium text-sm">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
