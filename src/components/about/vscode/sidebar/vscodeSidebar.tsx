'use client';

import { ThemeContext } from '@/context/ThemeContext';
import { VscodeContext } from '@/context/VscodeContext';
import { VsCodeFileType, VsCodeFolderType } from '@/types/vscodeTypes';
import Image from 'next/image';
import { FC, MouseEventHandler, useContext, useId } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';

export const VscodeSidebar: FC = () => {
  const { state } = useContext(VscodeContext);
  const { theme } = useContext(ThemeContext);
  const folders: VsCodeFolderType[] = state.fileExplorer.filter(
    (file) => file.fileType === 'folder'
  ) as VsCodeFolderType[];
  const files: VsCodeFileType[] = state.fileExplorer.filter(
    (file) => file.fileType === 'file'
  ) as VsCodeFileType[];

  return (
    <div
      className={`hidden md:flex flex-col gap-2 md:w-1/5 p-5 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'
      }`}>
      <h1 className="text-sm text-nowrap truncate">EXPLORER: PORTFOLIO</h1>
      {folders
        ? folders.map((folder) => (
            <VsCodeFolder key={`FOLDER_${folder.id}`} folder={folder} />
          ))
        : null}
      {files
        ? files.map((file) => (
            <VsCodeFile key={`File_${file.id}`} file={file} />
          ))
        : null}
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
  const { theme } = useContext(ThemeContext);

  const handleFileClick = (event: any) => {
    event.stopPropagation();
    dispatch({
      type: 'SET_CURRENT_FILE',
      payload: { id: file.id },
    });
  };

  const getIcon = (filename: string) => {
    const iconMap: Record<string, string> = {
      '.json': '/svgs/json.svg',
      '.tsx': '/svgs/tsx.svg',
    };

    const fileExtension = filename.substring(filename.lastIndexOf('.'));
    const iconSrc = iconMap[fileExtension] || '/svgs/default_file.svg';

    return (
      <div>
        <Image src={iconSrc} priority height={16} width={16} alt="icon" />
      </div>
    );
  };

  return (
    <div
      className={`flex items-center gap-2 pl-12 cursor-pointer ${
        file.isActive
          ? theme === 'dark'
            ? 'border-2 border-white'
            : 'bg-gray-100'
          : ''
      } `}
      onClick={handleFileClick}>
      <span>{getIcon(file.filename)}</span>
      <span className="truncate">{file.filename}</span>
    </div>
  );
};
