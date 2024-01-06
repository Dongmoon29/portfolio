import AboutMe from '@/components/aboutMe';
import Contact from '@/components/contact';
import Works from '@/components/experience';
import Intruduction from '@/components/introduction';

const Home = () => {
  return (
    <div className={'flex flex-col'}>
      <Intruduction />
      <AboutMe />
      <Works />
      <Contact />
    </div>
  );
};

export default Home;