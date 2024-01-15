import { FC } from 'react';

type OsxWindowHeaderProps = {
  title: string;
};
export const OsxWindowHeader: FC<OsxWindowHeaderProps> = ({ title }) => {
  return (
    <div className="sm:grid sm:grid-cols-3 justify-center items-center text-white bg-gray-700 rounded-none sm:rounded-t-xl p-2 h-10">
      <div className="flex justify-start gap-2">
        <div className="rounded-full bg-red-500 w-4 h-4 flex justify-center items-center p-2"></div>
        <div className="rounded-full bg-yellow-300 w-4 h-4"></div>
        <div className="rounded-full bg-green-300 w-4 h-4"></div>
      </div>
      <div className="flex justify-center">
        <h1>{title}</h1>
      </div>
      <div></div>
    </div>
  );
};
