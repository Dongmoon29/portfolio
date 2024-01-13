'use client';

import { FileIcon, FolderIcon } from '@/components/fileIcons/icons';
import { useThemeContext } from '@/context/ThemeContext';
import { VscodeContext, useVscodeContext } from '@/context/VscodeContext';
import { VsCodeFileType, VsCodeFolderType } from '@/types/vscodeTypes';
import { FC, MouseEventHandler, useContext, useId } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';

export const VscodeSidebar: FC = () => {
  const { state } = useContext(VscodeContext);
  const { theme } = useThemeContext();
  const folders = state.fileExplorer?.folders;
  const files = state.fileExplorer?.files;

  return (
    <div
      className={`hidden md:flex flex-col gap-2 md:w-1/5 p-5 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'
      }`}>
      <h1 className="text-sm text-nowrap truncate">EXPLORER: PORTFOLIO</h1>
      <div>
        {folders
          ? folders.map((folder) => (
              <VsCodeFolder
                key={`FOLDER_${folder.id}`}
                folder={folder}
                level={1}
              />
            ))
          : null}
        {files
          ? files.map((file) => (
              <VsCodeFile key={`File_${file.id}`} file={file} level={1} />
            ))
          : null}
      </div>
    </div>
  );
};

type VsCodeFolderProps = {
  folder: VsCodeFolderType;
  level: number;
};

const VsCodeFolder: FC<VsCodeFolderProps> = ({ folder, level }) => {
  const { dispatch } = useVscodeContext();
  const id = useId();
  const handleToggle: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
    dispatch({ type: 'TOGGLE_FOLDER', payload: { id: folder.id } });
  };

  const padding = `${(level - 1) * 3}`;

  return (
    <div className={`cursor-pointer pl-${padding} py-1`} onClick={handleToggle}>
      <div className="flex items-center gap-2 min-w-64">
        {folder.isActive ? (
          <div className="flex justify-center items-center">
            <IoIosArrowDown />
            <FolderIcon isOpen />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <IoIosArrowForward />
            <FolderIcon />
          </div>
        )}
        <span className="truncate">{folder.foldername}</span>
      </div>
      {folder.isActive && folder.folders
        ? folder.folders.map((folder) => (
            <VsCodeFolder
              key={`${folder.id}_${id}`}
              folder={folder}
              level={level + 1}
            />
          ))
        : null}
      {folder.isActive
        ? folder.files.map((file) => (
            <VsCodeFile
              key={`${file.filename}_${id}`}
              file={file}
              level={level + 1}
            />
          ))
        : null}
    </div>
  );
};

type VsCodeFileProps = {
  file: VsCodeFileType;
  level: number;
};

const VsCodeFile: FC<VsCodeFileProps> = ({ file, level }) => {
  const { dispatch } = useVscodeContext();
  const { theme } = useThemeContext();

  const handleFileClick = (event: any) => {
    event.stopPropagation();
    dispatch({
      type: 'SET_CURRENT_FILE',
      payload: { id: file.id },
    });
  };

  const paddingLeft = `${(level - 1) * 3}`;

  return (
    <div
      className={`flex items-center gap-2 pl-${paddingLeft} cursor-pointer ${
        file.isActive
          ? theme === 'dark'
            ? 'border-2 border-white'
            : 'bg-gray-100'
          : ''
      } `}
      onClick={handleFileClick}>
      <span>{<FileIcon filename={file.filename} size={16} />}</span>
      <span className="truncate">{file.filename}</span>
    </div>
  );
};
