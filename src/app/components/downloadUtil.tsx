import { IContactCard } from "../components/ProfileCard"; // Adjust the import path based on your project structure
import facebook from "../../../public/fb.svg"; 
import instagram from "../../../public/insta.svg";
import linkedin from "../../../public/linkedin.svg";
import twitter from "../../../public/twitter.svg";  
import globe from "../../../public/globe.svg"; 

const formatPhoneNumber = (num: string) => {
  const cleaned = num.replace(/[^\d]/g, '');
  if (cleaned.startsWith('971') || cleaned.startsWith('91') || cleaned.startsWith('+')) {
    return cleaned.startsWith('+') ? cleaned : `+${cleaned}`;
  }
  return `+971${cleaned}`;
};

const fetchIconAsBase64 = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const fileType = blob.type.split("/")[1].toUpperCase();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = (reader.result as string).split(",")[1];
        resolve(`SOCIAL_ICON;ENCODING=b;TYPE=${fileType}:${base64data}`);
      };
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.error("Failed to fetch icon", err);
    return null;
  }
};

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

export const handleDownloadContact = async (contact: IContactCard) => {
  const [firstName, ...rest] = contact.name.trim().split(" ");
  const lastName = rest.join(" ");

  const workPhone = formatPhoneNumber(contact.contactNumber);
  const whatsapp = contact.whatsappNumber ? formatPhoneNumber(contact.whatsappNumber) : "";

  const photoLine = await fetchPhotoAsBase64(contact.photo);

  // Fetch social media icons as base64
  const facebookIcon = await fetchIconAsBase64(facebook);
  const instagramIcon = await fetchIconAsBase64(instagram);
  const linkedinIcon = await fetchIconAsBase64(linkedin);
  const twitterIcon = await fetchIconAsBase64(twitter);
  const whatsappIcon = await fetchIconAsBase64(whatsapp);
  const globeIcon = await fetchIconAsBase64(globe);

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

  // Add social media links to vCard
  if (facebookIcon) vCardLines.push(`X-SOCIALPROFILE;TYPE=facebook:${contact.facebookLink}`);
  if (instagramIcon) vCardLines.push(`X-SOCIALPROFILE;TYPE=instagram:${contact.instagramLink}`);
  if (linkedinIcon) vCardLines.push(`X-SOCIALPROFILE;TYPE=linkedin:${contact.linkedinLink}`);
  if (twitterIcon) vCardLines.push(`X-SOCIALPROFILE;TYPE=twitter:${contact.twitterLink}`);
  if (whatsappIcon) vCardLines.push(`X-SOCIALPROFILE;TYPE=whatsapp:${contact.whatsappNumber}`);
  if (globeIcon) vCardLines.push(`X-SOCIALPROFILE;TYPE=website:${contact.websiteLink}`);

  if (photoLine) {
    vCardLines.push(photoLine);
  }

  vCardLines.push("END:VCARD", "");

  const vCardData = vCardLines.join('\r\n'); // CRLF

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
