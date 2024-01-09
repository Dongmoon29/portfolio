'use client';
import { VscodeContext } from '@/context/VscodeContext';
import { VsCodeFileType, VsCodeFolderType } from '@/types/vscodeTypes';
import Image from 'next/image';
import { FC, MouseEventHandler, useContext, useId } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';

export const VscodeSidebar: FC = () => {
  const { state } = useContext(VscodeContext);
  return (
    <div className="flex flex-col gap-2 w-1/5 p-5 bg-gray-200 rounded-bl-xl">
      <h1 className="text-sm text-nowrap truncate">EXPLORER: PORTFOLIO</h1>
      {state.fileExplorer.map((folder) => (
        <VsCodeFolder key={`FOLDER_${folder.id}`} folder={folder} />
      ))}
    </div>
  );
};

type VsCodeFolderProps = {
  folder: VsCodeFolderType;
};

const VsCodeFolder: FC<VsCodeFolderProps> = ({ folder }) => {
  const { dispatch } = useContext(VscodeContext);
  const id = useId();
  const handleToggle: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
    dispatch({ type: 'TOGGLE_FOLDER', payload: { id: folder.id } });
  };

  return (
    <div className="cursor-pointer" onClick={handleToggle}>
      <div className="flex items-center gap-2 pl-3 min-w-64">
        {folder.isActive ? (
          <div className="flex justify-center items-center">
            <IoIosArrowDown />
            <Image
              src={'/svgs/default_folder_opened.svg'}
              priority
              height={16}
              width={16}
              alt="icon"
            />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <IoIosArrowForward />
            <div>
              <Image
                src={'/svgs/default_folder.svg'}
                priority
                height={16}
                width={16}
                alt="icon"
              />
            </div>
          </div>
        )}
        <span className="truncate">{folder.foldername}</span>
      </div>
      {folder.isActive
        ? folder.files.map((file) => (
            <VsCodeFile key={`${file.filename}_${id}`} file={file} />
          ))
        : null}
    </div>
  );
};

type VsCodeFileProps = {
  file: VsCodeFileType;
};

const VsCodeFile: FC<VsCodeFileProps> = ({ file }) => {
  const { dispatch } = useContext(VscodeContext);

  const handleFileClick = (event: any) => {
    event.stopPropagation();
    dispatch({
      type: 'SET_CURRENT_FILE',
      payload: { id: file.id },
    });
  };

  const getIcon = (filename: string) => {
    let icon = (
      <div>
        <Image
          src={'/svgs/default_file.svg'}
          priority
          height={16}
          width={16}
          alt="icon"
        />
      </div>
    );
    if (filename.endsWith('.json')) {
      icon = (
        <div>
          <Image
            src={'/svgs/json.svg'}
            priority
            height={16}
            width={16}
            alt="icon"
          />
        </div>
      );
    }
    if (filename.endsWith('.tsx')) {
      icon = (
        <div>
          <Image
            src={'/svgs/tsx.svg'}
            priority
            height={16}
            width={16}
            alt="icon"
          />
        </div>
      );
    }
    return icon;
  };

  return (
    <div
      className={`flex items-center gap-2 pl-12 cursor-pointer ${
        file.isActive ? 'bg-gray-300' : ''
      } `}
      onClick={handleFileClick}>
      <span>{getIcon(file.filename)}</span>
      <span className="truncate">{file.filename}</span>
    </div>
  );
};
