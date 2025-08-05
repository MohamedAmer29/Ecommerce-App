import { useNavigate } from "react-router";
import { assets } from "../assets/assets";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="logo" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            dignissimos aliquid iste maxime, quis suscipit tenetur recusandae
            debitis esse numquam.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="cursor-pointer" onClick={() => navigate("/")}>
              Home
            </li>
            <li className="cursor-pointer" onClick={() => navigate("/about")}>
              About Us
            </li>
            <li className="cursor-pointer" onClick={() => navigate("/cart")}>
              Delivery
            </li>
            <li className="cursor-pointer" onClick={() => navigate("/contact")}>
              Privacy Policy
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+20-100-948-773-4</li>
            <li>m1o1h1a1a1@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          &copy; Copyright 2024@ amer.com - All Right Preserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
