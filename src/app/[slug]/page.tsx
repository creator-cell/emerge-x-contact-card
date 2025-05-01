// src/app/[slug]/page.tsx

import ProfileCard from '../components/ProfileCard';

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { slug } = params;

  if (!slug) {
    return null;
  }

  const response = await fetch(`${process.env.SERVER}/contactCard/contact/${slug}`);
  const data = await response.json();

  if (!data) return null;

  return <ProfileCard data={data?.contactCard} />;
};

export default Page;
