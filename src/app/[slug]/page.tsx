import ProfileCard from '../components/ProfileCard';

const home = async (props: any) => {

  const { slug } = await props?.params;

  if (!slug) {
    return
  }

  const response = await fetch(`${process.env.SERVER}/contactCard/contact/${slug}`);
  const data = await response.json();

  if (!data) return

  return <ProfileCard data={data?.contactCard} />;
}


export default home

