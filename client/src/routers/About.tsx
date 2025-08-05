import { assets } from "../assets/assets";
import NewSletterBox from "../components/NewSletterBox";
import Title from "../components/Title";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt="about_img"
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequatur, rem sint. Corporis nihil eaque aliquam nostrum atque
            fugit a error pariatur iste cumque odit perferendis optio architecto
            odio, dicta esse aperiam enim, illo tempora debitis?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Praesentium architecto soluta labore officia sequi nihil fugiat est
            sit ad obcaecati.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nemo
            laborum iure magni temporibus maxime.
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque
            error aut tenetur praesentium ea quo, provident nesciunt maxime
            ipsum nam?
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque
            error aut tenetur praesentium ea quo, provident
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Services</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque
            error aut tenetur
          </p>
        </div>
      </div>
      <NewSletterBox />
    </div>
  );
};

export default About;
