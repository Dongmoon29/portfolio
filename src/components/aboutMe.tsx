import Image from 'next/image';
import { FC } from 'react';
import Skills from './skills';

type Skill = {
  Languages: Language;
  programmings: Programming;
};

type Language = {
  id: string;
  proficieny: string;
};
type Programming = {
  id: string;
  level: number;
};

const skills = {
  languages: [
    { id: 'Korean', proficiency: 'native' },
    { id: 'English', proficiency: 'professional' },
  ],
  programmings: [
    { id: 'JavaScript', level: 5 },
    { id: 'Typescript', level: 5 },
    { id: 'ReactJS', level: 5 },
    { id: 'NextJS', level: 2 },
    { id: 'CSS', level: 4 },
    { id: 'HTML', level: 5 },
    { id: 'Git', level: 5 },
    { id: 'C#', level: 2 },
    { id: '.NET', level: 2 },
    { id: 'MySQL', level: 4 },
  ],
};

const AboutMe: FC = () => {
  return (
    <section
      id="aboutMe"
      className="p-16 flex gap-32 bg-gradient-to-r from-green-50 to-green-200 dark:from-orange-950 dark:to-orange-900 scroll-smooth">
      <div className="rounded-full overflow-hidden">
        <Image src="/dongmoon_kim.jpg" width={500} height={500} alt="profile" />
      </div>
      <div>
        <div>Skills</div>
        <Skills skills={skills.programmings} />
      </div>
    </section>
  );
};

export default AboutMe;
