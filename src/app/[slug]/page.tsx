// src/app/[slug]/page.tsx

import ProfileCard from '../components/ProfileCard';

interface PageProps {
  params: Promise<{ slug: string }>
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;

  if (!slug) {
    return null;
  }

  const response = await fetch(`${process.env.SERVER}/contactCard/contact/${slug}`);
  const data = await response.json();
console.log(data)
  if (!data) return null;

  return <ProfileCard data={data?.contactCard} />;
};

export default Page;
