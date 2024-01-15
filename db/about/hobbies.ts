type Hobby = {
  name: string;
  description: string;
  isHealthy: boolean;
  shouldDevelopFuther: boolean;
};

type Hobbies = Hobby[];

const myHobbies: Hobbies = [
  {
    name: 'Running',
    description: 'I want to love running but it is quite hard',
    isHealthy: true,
    shouldDevelopFuther: true,
  },
  {
    name: 'Play bass guitar',
    description: "It's fun, just a bit on the slow side.",
    isHealthy: true,
    shouldDevelopFuther: true,
  },
  {
    name: 'Drinking',
    description: 'I like drinking but should not do it too much',
    isHealthy: false,
    shouldDevelopFuther: true,
  },
];

const healthyHobbies = myHobbies.filter((hobby) => hobby.isHealthy);
setMyGoal(healthyHobbies);
