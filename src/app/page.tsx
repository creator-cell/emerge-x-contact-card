import ProfileCard from './components/ProfileCard';

const Home = async () => {

  const response = await fetch(`${process.env.SERVER}/contactCard/name/Mohnish`);
  const data = await response.json();


  return <ProfileCard data={data?.contactCard} />;
}


export default Home