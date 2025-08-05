import { Link, NavLink, useNavigate } from "react-router";
import { assets } from "../assets/assets.ts";
import { useState, useContext } from "react";
import { ShopContenxt } from "../contexts/ShopContext.ts";

const Navbar = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setShowSearch, getCartCount, token, setToken, setCartItems } =
    useContext(ShopContenxt);
  function logout() {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  }
  return (
    <>
      <div className="flex items-center justify-between p-2  font-medium ">
        <Link to="/">
          <img src={assets.logo} alt="Logo img" className="w-36" />
        </Link>

        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>Home</p>
            <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink
            to="/collection"
            className="flex flex-col items-center gap-1"
          >
            <p>Collection</p>
            <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>About</p>
            <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>Contact</p>
            <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        </ul>

        <div className="flex items-center gap-6">
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="search icon"
          />
          <div className="group relative">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              src={assets.profile_icon}
              alt="profile_icon"
              className="w-5 cursor-pointer"
            />
            {/* Dropdown Menu */}

            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0  pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 text-gray-500 bg-slate-100 rounded-2xl rounded-tr-none">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={() => navigate("/orders")}
                  >
                    Orders
                  </p>
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={() => logout()}
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              alt="cart icon"
              className="w-5 min-w-5 "
            />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 text-white bg-black aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </Link>
          <img
            src={assets.menu_icon}
            alt="menu_icon"
            onClick={() => setVisible((prev) => (prev = !prev))}
            className="w-5 cursor-pointer sm:hidden"
          />
        </div>
        {/* side bar menu for phones */}
        <div
          className={`absolute top-0 right-0  bottom-0 overflow-hidden bg-white transition-all  ${
            visible ? "w-full" : "w-0"
          }`}
        >
          {" "}
          <div className="flex flex-col  text-gray-600 ">
            <div
              className="flex  items-center gap-4 p-3"
              onClick={() => setVisible(false)}
            >
              <img
                className="h-4 rotate-180"
                src={assets.dropdown_icon}
                alt="dropdown"
              />
              <p className="cursor-pointer">Back</p>
            </div>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 hover:text-black border-y"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 hover:text-black border-y"
              to="/collection"
            >
              Collection
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 hover:text-black border-y"
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 hover:text-black border-y"
              to="/contact"
            >
              Contacts
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
