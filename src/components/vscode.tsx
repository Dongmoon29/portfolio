'use client';

import { FC, MouseEvent, useContext, useId } from 'react';
import { FaFile, FaFolder, FaFolderOpen, FaReact } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { OsxWindowButtons } from './osxWindowButtons';
import { BsFiletypeJson } from 'react-icons/bs';
import { VscodeContext } from '@/context/VscodeContext';
import { VsCodeFileType, VsCodeFolderType } from '@/types/vscodeTypes';

const VsCodeComponent: FC = () => {
  const { state } = useContext(VscodeContext);

  return (
    <div className="flex-col overflow-hidden bg-gray-100 h-full w-full rounded-t-xl min-h-96 rounded-b-xl">
      <div className="grid grid-cols-3 justify-center items-center text-white bg-gray-700 rounded-t-xl p-2">
        <div className="flex justify-start gap-2">
          <OsxWindowButtons />
        </div>
        <div className="flex justify-center">
          <h1>{state.currentFile?.filename ?? 'vscode'}</h1>
        </div>
        <div></div>
      </div>
      <div className="flex h-full">
        {/* vscode sidebar */}
        <div className="flex-col justify-center gap-2 w-1/6 p-5 bg-gray-200 rounded-bl-xl">
          {state.fileExplorer.map((folder) => (
            <VsCodeFolder key={`FOLDER_${folder.id}`} folder={folder} />
          ))}
        </div>
        {/* vscode main editing buffer tabs */}
        <div className="flex-col w-full bg-gray-200">
          {/* vscode main editing area */}
          <VsCodeTabs />
          <VsCodeEditorArea
            content={state.currentFile?.content ?? 'Pick a file'}
          />
        </div>
      </div>
    </div>
  );
};

type VsCodeBuffer = {
  id: string;
  filename: string;
  isActive: boolean;
};

const VsCodeTabs: FC = () => {
  const { state } = useContext(VscodeContext);
  const buffers = state.buffers;
  if (!buffers) {
    return null;
  }

  return (
    <div className="flex justify-start items-end">
      {buffers.map((buffer) => (
        <VsCodeTab
          key={`TAB_${buffer.filename}_${buffer.id}`}
          buffer={buffer}
        />
      ))}
    </div>
  );
};

type VsCodeTabProps = {
  buffer: VsCodeBuffer;
};

const VsCodeTab: FC<VsCodeTabProps> = ({ buffer }) => {
  const { dispatch } = useContext(VscodeContext);

  let icon = <FaFile />;
  if (buffer.filename.endsWith('.json')) {
    icon = <BsFiletypeJson />;
  }
  if (buffer.filename.endsWith('.tsx')) {
    icon = <FaReact />;
  }

  const handleTabDeleteClick = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch({ type: 'DELETE_BUFFER', payload: { id: buffer.id } });
  };

  const handleTabClick = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch({ type: 'SET_CURRENT_FILE', payload: { id: buffer.id } });
  };

  return (
    <div
      onClick={handleTabClick}
      className={` cursor-pointer flex gap-x-3 p-3 justify-center items-center ${
        buffer.isActive ? 'bg-gray-100 border-t-3 border-blue-500' : ''
      }
      `}>
      {icon}
      <span>{buffer.filename}</span>
      <span onClick={handleTabDeleteClick}>x</span>
    </div>
  );
};

type VsCodeEditorAreaProps = {
  content?: string;
};

const VsCodeEditorArea: FC<VsCodeEditorAreaProps> = ({ content }) => {
  const contents = typeof content === 'string' ? content : '';
  return (
    <div className="bg-gray-100 w-full h-full text-black flex gap-2 overflow-scroll overflow-x-scroll">
      {/* main editor content line numbers */}
      {/* <div className="bg-gray-300 w-14 text-center">1</div> */}
      <div>
        <pre>
          <code>{contents ?? ''}</code>
        </pre>
      </div>
    </div>
  );
};

type VsCodeFolderProps = {
  folder: VsCodeFolderType;
};

const VsCodeFolder: FC<VsCodeFolderProps> = ({ folder }) => {
  const { dispatch } = useContext(VscodeContext);
  const id = useId();
  const handleToggle = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch({ type: 'TOGGLE_FOLDER', payload: { id: folder.id } });
  };

  return (
    <div className="cursor-pointer" onClick={handleToggle}>
      <div className="flex items-center gap-2 pl-3">
        {folder.isActive ? (
          <>
            <IoIosArrowDown />
            <FaFolderOpen
              className={` 
        text-yello-600`}
            />
          </>
        ) : (
          <>
            <IoIosArrowForward />
            <FaFolder
              className={` 
        text-yello-600`}
            />
          </>
        )}
        <span>{folder.foldername}</span>
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

  return (
    <div
      className={`flex items-center gap-2 pl-12 cursor-pointer ${
        file.isActive ? 'bg-black' : ''
      } `}
      onClick={handleFileClick}>
      <span className="truncate">{file.filename}</span>
    </div>
  );
};

export default VsCodeComponent;
