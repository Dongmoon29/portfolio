import { FC } from 'react';
import VsCodeComponent from './vscode';

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

// implement vscode look alike component
const AboutMe: FC = () => {
  return (
    <section
      id="aboutMe"
      className={`p-16 flex justify-center items-center gap-32 h-screen max-h-screen scroll-smooth `}>
      <VsCodeComponent />
    </section>
  );
};

export default AboutMe;
