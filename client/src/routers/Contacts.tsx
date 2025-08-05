import { assets } from "../assets/assets";
import NewSletterBox from "../components/NewSletterBox";
import Title from "../components/Title";

const Contacts = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1="CONTACT" text2="US" />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          alt="contact_img"
          className="w-full md:max-w-[480px]"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            417417 AmerStreat <br />
            Shari3 Said, Tanta, Egypt
          </p>
          <p className="text-gray-500">
            Tel:+20-100-948-773-4 <br />
            Email: m1o1h1a1a1@gmail.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers at AmerShop
          </p>
          <p className="text-gray-500">
            Learn more about our team and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewSletterBox />
    </div>
  );
};

export default Contacts;
