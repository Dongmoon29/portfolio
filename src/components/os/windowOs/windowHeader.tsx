import { VscChromeMinimize } from 'react-icons/vsc';
import { VscChromeMaximize } from 'react-icons/vsc';
import { IoMdClose } from 'react-icons/io';
import { PiCopySimpleLight } from 'react-icons/pi';
import { FC, ReactNode } from 'react';

type WindowHeaderProps = {
  title: string;
  icon?: ReactNode;
  toggleMaximize?: () => void;
  isMaximize: boolean;
};
export const WindowHeader: FC<WindowHeaderProps> = ({
  title,
  icon,
  toggleMaximize,
  isMaximize,
}) => {
  return (
    <div className="grid grid-cols-3 justify-center items-center text-white bg-gray-700 rounded-none sm:rounded-t-xl p-2 h-10">
      <div>{icon ?? ''}</div>
      <div className="flex justify-center">
        <h1>{title}</h1>
      </div>
      <div className="flex justify-end gap-2 cursor-pointer">
        <div className="px-2">
          <VscChromeMinimize />
        </div>
        <div className="px-2" onClick={toggleMaximize}>
          {isMaximize ? <PiCopySimpleLight /> : <VscChromeMaximize />}
        </div>
        <div className="px-2">
          <IoMdClose />
        </div>
      </div>
    </div>
  );
};
