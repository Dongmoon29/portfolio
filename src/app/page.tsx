import AboutMe from '@/components/aboutMe/aboutMe';
import Contact from '@/components/contact';
import Works from '@/components/experience';
import Intruduction from '@/components/introduction';

const Home = () => {
  return (
    <div>
      <Intruduction />
      <AboutMe />
      <Works />
      <Contact />
    </div>
  );
};

export default Home;
