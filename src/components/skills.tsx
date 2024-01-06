import { FC, useId } from 'react';

type Programming = {
  id: string;
  level: number;
};
// TODO: need to rename
type SkillsProps = {
  skills: Programming[];
};

const Skills: FC<SkillsProps> = ({ skills }) => {
  const id = useId();
  return (
    <>
      {skills.map((skill: Programming) => {
        return <div key={id}>{skill.id}</div>;
      })}
    </>
  );
};

export default Skills;
