"use client";
import { useEffect } from "react";
import Image from "next/image";
import facebook from "../../../public/fb.svg";
import instagram from "../../../public/insta.svg";
import linkedin from "../../../public/linkedin.svg";
import logo from "../../../public/logo.svg";
import twitter from "../../../public/twitter.svg";
import globe from "../../../public/globe.svg";
import whatsapp from "../../../public/whatsapp.svg";
import share from "../../../public/share.svg";
import Link from "next/link";
import { useMemo, useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { AiOutlineShareAlt } from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";


export interface IContactCard {
  _id?: string;
  photo: string;
  name: string;
  slug: string;
  position: string;
  contactNumber: string;
  email: string;
  location: string;
  websiteLink: string;
  facebookLink: string;
  whatsappNumber: string;
  instagramLink: string;
  linkedinLink: string;
  twitterLink: string;
  createdAt?: string;
  updatedAt?: string;
}

const ProfileCard = ({ data }: { data: IContactCard }) => {
    console.log('data =--', data)
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  useEffect(() => {
    setShowDownloadModal(true);
  }, []);
  const socialLinks = useMemo(() => {
    return [
      { link: data?.websiteLink, icon: globe },
      { link: data?.facebookLink, icon: facebook },
      { link: `https://wa.me/${data?.whatsappNumber}`, icon: whatsapp },
      { link: data?.instagramLink, icon: instagram },
      { link: data?.linkedinLink, icon: linkedin },
      { link: data?.twitterLink, icon: twitter },
    ];
  }, [data]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          text: "Check out this page!",
          url: window.location.href,
        })
        .catch((err) => console.error("Error sharing:", err));
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Link copied to clipboard!"))
        .catch(() => alert("Failed to copy link"));
    }
  };

  function formatInternationalNumber(rawNumber: string): string {
    const cleaned = rawNumber.replace(/[\s()-]/g, "");
    const match = cleaned.match(/^\+(91|971)(\d{6,})$/);
    if (!match) return rawNumber;

    const countryCode = match[1];
    let numberPart = match[2];

    if (numberPart.startsWith("0")) {
      numberPart = numberPart.slice(1);
    }

    if (countryCode === "91" && numberPart.length === 10) {
      return `+91 ${numberPart.slice(0, 5)} ${numberPart.slice(5)}`;
    }

    if (countryCode === "971") {
      return `+971 ${numberPart.slice(0, 2)} ${numberPart.slice(2, 5)} ${numberPart.slice(5)}`;
    }

    return `+${countryCode} ${numberPart}`;
  }

  const handleDownloadContact = async (contact: IContactCard) => {
    const [firstName, ...rest] = contact.name.trim().split(" ");
    const lastName = rest.join(" ");
    const formatPhoneNumber = (num: string) => {
      const cleaned = num.replace(/[^\d]/g, "");
      if (cleaned.startsWith("971") || cleaned.startsWith("91") || cleaned.startsWith("+")) {
        return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
      }
      return `+971${cleaned}`;
    };
    const workPhone = formatPhoneNumber(contact.contactNumber);
    const whatsapp = contact.whatsappNumber ? formatPhoneNumber(contact.whatsappNumber) : "";

    const fetchPhotoAsBase64 = async (url: string): Promise<string | null> => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const fileType = blob.type.split("/")[1].toUpperCase();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = (reader.result as string).split(",")[1];
            resolve(`PHOTO;ENCODING=b;TYPE=${fileType}:${base64data}`);
          };
          reader.readAsDataURL(blob);
        });
      } catch (err) {
        console.error("Failed to fetch photo", err);
        return null;
      }
    };

    const photoLine = await fetchPhotoAsBase64(contact.photo);

    const vCardLines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${lastName};${firstName};;;`,
      `FN:${contact.name}`,
      `TITLE:${contact.position}`,
      `TEL;TYPE=WORK,VOICE:${workPhone}`,
    ];

    if (whatsapp && whatsapp !== workPhone) {
      vCardLines.push(`TEL;TYPE=CELL,WhatsApp:${whatsapp}`);
    }

    vCardLines.push(
      `EMAIL;TYPE=INTERNET:${contact.email}`,
      `URL:${contact.websiteLink}`,
      `NOTE:Office Location - ${contact.location}`
    );

    if (photoLine) {
      vCardLines.push(photoLine);
    }

    vCardLines.push("END:VCARD", "");

    const vCardData = vCardLines.join("\r\n");

    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${contact.name.replace(/\s+/g, "_")}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShareContacts = async ({ title, text }: { title: string; text: string }) => {
    try {
      if (navigator.share) {
        await navigator.share({ title, text });
      } else {
        alert("Sharing not supported on this browser.");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <div className="flex w-full relative bg-white h-screen max-h-screen overflow-y-auto justify-center items-center p-4">
      <div className="max-w-4xl relative z-10 w-full rounded-xl bg-[#080a08] shadow-2xl p-2 md:p-6 md:pt-0 m-auto">
        <Image src={logo} alt="Logo" className="absolute w-28 md:w-44 top-2 z-20 max-md:left-1/2 max-md:-translate-x-1/2 md:right-4" />

        <div className="flex flex-col md:flex-row overflow-hidden md:pt-6 justify-between">
          <div className="w-full md:w-[30%]">
            <div className="relative flex justify-center items-center h-80 md:h-96 w-full">
              <div className="absolute inset-0 bg-[url(/stripes.svg)] bg-center bg-no-repeat bg-contain z-0" />
              <div className="relative z-10 w-24 md:w-40">
                <Image
                  src={data?.photo}
                  alt={data?.name}
                  width={300}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-[70%] p-4 md:p-10 relative space-y-6">
            <Image
              src="/contact.png"
              width={100}
              height={100}
              alt=""
              className="absolute w-10 cursor-pointer md:w-16 z-28 right-1 md:right-2 top-16 md:top-[75%] -translate-y-1/2"
            />

            <div className="absolute inset-0 h-full z-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] bg-[position:40px_0]" />

            <div className="space-y-2 text-center md:text-left relative z-20">
              <h1 className="text-2xl lg:text-3xl font-[900] text-white">{data?.name}</h1>
              <p className="text-md font-[400] text-white">{data?.position}</p>
            </div>

            <div className="flex flex-nowrap relative gap-4 justify-center md:justify-evenly z-20 text-md">
              <div className="w-1/2 space-y-3">
                <p className="text-sm md:text-md text-white">{formatInternationalNumber(data?.contactNumber)}</p>

                <div className="flex items-center gap-4">
                  <Link href={`tel:${data?.contactNumber}`}>
                    <button className="text-sm flex items-center justify-center gap-2 px-4 py-1 border rounded-full text-white">
                      <IoCallOutline className="text-lg text-white" />
                      Call
                    </button>
                  </Link>

                  <div
                    className="border rounded-full p-1 text-white"
                    onClick={() => handleShareContacts({ title: "Contact Info", text: `Name: ${data?.name}\nPhone: ${data?.contactNumber}` })}
                  >
                    <AiOutlineShareAlt className="text-lg text-white" />
                  </div>
                </div>
              </div>
              <div className="w-1/2 space-y-3">
                <p className="text-sm md:text-md text-white">{data?.email}</p>

                <div className="flex items-center gap-4">
                  <Link href={`mailto:${data?.email}`}>
                    <button className="text-sm flex items-center justify-center gap-2 px-4 py-1 border rounded-full text-white">
                      <MdOutlineMail className="text-lg text-white" />
                      Email
                    </button>
                  </Link>

                  <div
                    className="border rounded-full p-1 text-white"
                    onClick={() => handleShareContacts({ title: "Email Info", text: `Name: ${data?.name}\nEmail: ${data?.email}` })}
                  >
                    <AiOutlineShareAlt className="text-lg text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 z-20 relative">
              <p className="text-md text-center md:text-left text-white">Office Location</p>
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18...`}
                className="w-full h-[150px] md:h-[200px] md:w-[90%] rounded-2xl"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-2 w-full my-2 z-20 text-white">
          {socialLinks.map(({ link, icon }, i) => (
            <Link key={i} href={link} target="_blank" rel="noopener noreferrer">
              <Image src={icon} alt="social" width={100} height={100} className="w-6 h-6 md:w-[35px] md:h-[35px] hover:scale-110 transition-transform" />
            </Link>
          ))}
          <Image
            src={share}
            alt="share"
            width={100}
            height={100}
            className="w-6 h-6 md:w-[35px] md:h-[35px] hover:scale-110 transition-transform cursor-pointer"
            onClick={handleShare}
          />
        </div>
      </div>

      {/* Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl text-center max-w-sm w-full shadow-xl">
            
            <p className="text-sm text-gray-600 mb-6">Do you want to download this contact card?</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={async () => {
                  setShowDownloadModal(false);
                  await handleDownloadContact(data);
                }}
              >
                Yes
              </button>
              <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400" onClick={() => setShowDownloadModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
