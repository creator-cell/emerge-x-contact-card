"use client";
import Image from "next/image";
import profile from "../../../public/profile.png";
import facebook from "../../../public/facebook.png";
import instagram from "../../../public/instagram.png";
import linkdin from "../../../public/linkdin.png";
import logo from "../../../public/logo.png";
import contact from "../../../public/contact.png";
import share from "../../../public/share.png";
import twitter from "../../../public/twitter.png";
import globe from "../../../public/globe.png";
import arrow from "../../../public/arrow.png";
import whatsapp from "../../../public/whatsapp.png";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ProfileCard = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-5">
      <div className="bg-black rounded-xl shadow-lg w-[1000px] max-w-6xl grid grid-cols-1 md:grid-cols-3 p-10 relative border text-center">
        <div className="absolute top-6 w-full flex md:justify-end justify-center">
          <Image
            src={logo}
            alt="Logo"
            width={140}
            height={140}
            className="min-[768px]:w-[200px] min-[768px]:mr-7 "
          />
        </div>

        {/* Profile Image (always centered) */}
        <div className="flex flex-col items-center justify-center col-span-1 md:-mt-35">
          <Image
            src={profile}
            alt="Vibin Baby"
            width={220}
            height={220}
            className="min-[768px]:w-[300px]"
          />
        </div>

        {/* Info Section */}
        <div className="flex flex-col col-span-2 justify-center items-center mt-4 md:ml-10">
          <div className="flex items-center justify-between w-full">
            <div className="flex min-[768px]:hidden"></div>
            <div className="text-center md:text-left ml-0 md:mb-4 md:mt-4">
              <h2 className="text-2xl min-[500px]:text-3xl font-bold mb-3 ml-14 md:ml-0">
                Vibin Baby
              </h2>
              <p className="text-lg min-[500px]:text-xl text-gray-300 mb-3 ml-14 md:ml-0">
                Chief Technical Officer
              </p>
            </div>

              {/* Contact image only visible < 770px */}
            <div className="min-[770px]:hidden">
              <Image
                src={contact}
                width={50}
                height={50}
                alt="contact"
                className="rounded-full"
              />
            </div>
          </div>

          {/* Call & Email Side by Side for all screen sizes */}
          <div className="flex flex-row justify-between gap-0.5 min-[500px]:gap-4 w-full">
            {/* Call */}
            <div className="flex flex-col md:items-start justify-start flex-1 min-w-[180px]">

              <p className="text-sm min-[500px]:text-xl font-medium mb-2">
                +971 50 106 0525
              </p>
              <div className="flex items-center justify-center gap-2">
                <button className="flex items-center justify-center bg-black px-3 py-1 min-[500px]:px-6 min-[500px]:py-2 rounded-full gap-2 border border-white text-xs min-[500px]:text-sm">
                  <FaPhoneAlt className="w-3 h-3 min-[500px]:w-4 min-[500px]:h-4" />{" "}
                  Call
                </button>
                <Image
                  src={share}
                  width={24}
                  height={24}
                  alt="share"
                  className="rounded-full min-[500px]:w-[35px] min-[500px]:h-[35px]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col md:items-start justify-start flex-1 min-w-[180px]">
              <p className="text-sm min-[500px]:text-xl font-medium mb-2">
                vibin@emergex.com
              </p>
              <div className="flex items-center justify-center gap-2">
                <button className="flex items-center justify-center bg-black px-3 py-1 min-[500px]:px-6 min-[500px]:py-2 rounded-full gap-2 border border-white text-xs min-[500px]:text-sm">
                  <FaEnvelope className="w-3 h-3 min-[500px]:w-4 min-[500px]:h-4" />{" "}
                  Email
                </button>
                <Image
                  src={share}
                  width={24}
                  height={24}
                  alt="share"
                  className="rounded-full min-[500px]:w-[35px] min-[500px]:h-[35px]"
                />
              </div>
            </div>
          </div>

          {/* Map and Contact */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4 mb-12 w-full">
            <div className="w-full md:w-[500px] md:text-left">
              <p className="text-sm min-[500px]:text-xl font-medium mb-2">
                Office Location
              </p>
              <iframe
                src="https://www.google.com/maps/embed?pb=..."
                width="100%"
                height="200"
                className="rounded-4xl border border-green-500"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>

            <div className="justify-center items-center h-[200px] hidden min-[770px]:flex">
              <Image
                src={contact}
                width={80}
                height={80}
                alt="contact"
                className="rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-1 left-0 w-full  flex  items-center justify-between p-3 mt-4">
          {[globe, facebook, whatsapp, instagram, linkdin, twitter, share].map(
            (icon, i) => (
              <Image key={i} src={icon} width={25} height={25} alt="social"  className="min-[768px]:w-[35px] min-[35px]:mr-5 "/>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
