'use client';

import { FC, ReactNode, useId, useState } from 'react';
import {
  FaFile,
  FaFolder,
  FaFolderOpen,
  FaImage,
  FaReact,
} from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { OsxWindowButtons } from './osxWindowButtons';
import { BsFiletypeJson } from 'react-icons/bs';

type VsCodeFolder = {
  files: VsCodeFile[];
  name: string;
  icon: ReactNode;
  color: string;
  path: string;
  folders?: VsCodeFolder[];
};

type VsCodeFile = {
  name: string;
  icon: ReactNode;
  content: string | {};
  path: string;
};

type ImageFile = {
  src: string;
  filename: string;
  path: string;
};

const files: VsCodeFile[] = [
  {
    name: 'about.json',
    icon: <BsFiletypeJson />,
    content: '{ "name": "John Doe", "age": 30, "city": "New York" }',
    path: '',
  },
  {
    name: 'test.txt',
    icon: <FaFile />,
    content: '{ "name": "John Doe", "age": 30, "city": "New York" }',
    path: '',
  },
];

const imageFiles: VsCodeFile[] = [
  {
    name: 'images',
    icon: <FaImage />,
    content: {
      src: '/profile_2.png',
    },
    path: '',
  },
];

const folders: VsCodeFolder[] = [
  {
    name: 'folder',
    icon: <FaFolder />,
    files: files,
    color: 'yellow',
    path: '',
  },
  {
    name: 'images',
    icon: <FaFolder />,
    files: imageFiles,
    color: 'yellow',
    path: '',
  },
];

const tmpTabs: VsCodeBuffer[] = [
  {
    filename: 'about.json',
    isActive: true,
  },
  {
    filename: 'test.txt',
    isActive: false,
  },
];

const VsCodeComponent: FC = () => {
  const [selectedFile, setSelectedFile] = useState(files[0]);

  return (
    <div className="flex-col overflow-hidden bg-gray-100 h-full w-full rounded-t-xl min-h-96 rounded-b-xl">
      <div className="grid grid-cols-3 justify-center items-center text-white bg-gray-700 rounded-t-xl p-2">
        <div className="flex justify-start gap-2">
          <OsxWindowButtons />
        </div>
        <div className="flex justify-center">
          <h1>data.json</h1>
        </div>
        <div></div>
      </div>
      <div className="flex h-full">
        {/* vscode sidebar */}
        <div className="flex-col justify-center gap-2 max-w-md  p-5 bg-gray-200 rounded-bl-xl">
          {folders.map((folder, index) => (
            <VsCodeFolder key={index} folder={folder} />
          ))}
        </div>
        {/* vscode main editing buffer tabs */}
        <div className="flex-col w-full bg-gray-200">
          {/* vscode main editing area */}
          <VsCodeTabs tabs={tmpTabs} />
          <VsCodeEditorArea content={'const test = 1;'} />
        </div>
      </div>
    </div>
  );
};

type VsCodeBuffer = {
  filename: string;
  isActive: boolean;
};

type VsCodeTabsProps = {
  tabs: VsCodeBuffer[];
};

const VsCodeTabs: FC<VsCodeTabsProps> = ({ tabs }) => {
  return (
    <div className="flex justify-start items-end">
      {tabs.map((tab, index) => (
        <VsCodeTab key={`TAB_${tab.filename}_${index}`} tab={tab} />
      ))}
    </div>
  );
};

type VsCodeTabProps = {
  tab: VsCodeBuffer;
};

const VsCodeTab: FC<VsCodeTabProps> = ({ tab }) => {
  let icon = <FaFile />;
  if (tab.filename.endsWith('.json')) {
    icon = <BsFiletypeJson />;
  }
  if (tab.filename.endsWith('.tsx')) {
    icon = <FaReact />;
  }

  return (
    <div
      className={`cursor-pointer flex gap-3 p-3 justify-center items-center ${
        tab.isActive ? 'bg-gray-100 border border-t-black' : ''
      }
      `}>
      {icon}
      <span>{tab.filename}</span>
    </div>
  );
};

type VsCodeEditorAreaProps = {
  content?: string;
};

const VsCodeEditorArea: FC<VsCodeEditorAreaProps> = ({ content }) => {
  return (
    <div className="bg-gray-100 w-full h-full text-black flex gap-2">
      {/* main editor content line numbers */}
      <div className="bg-gray-300 w-14 text-center">1</div>
      <div>
        <pre>
          <code>{content ?? ''}</code>
        </pre>
      </div>
    </div>
  );
};

type VsCodeFolderProps = {
  folder: VsCodeFolder;
};

const VsCodeFolder: FC<VsCodeFolderProps> = ({ folder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="cursor-pointer" onClick={handleToggle}>
      <div className="flex items-center gap-2 pl-3">
        {isOpen ? (
          <>
            <IoIosArrowDown />
            <FaFolderOpen
              className={` 
        text-${folder.color}-600`}
            />
          </>
        ) : (
          <>
            <IoIosArrowForward />
            <FaFolder
              className={` 
        text-${folder.color}-600`}
            />
          </>
        )}
        <span>{folder.name}</span>
      </div>
      {isOpen
        ? folder.files.map((file) => <VsCodeFile key={id} file={file} />)
        : null}
    </div>
  );
};

type VsCodeFileProps = {
  file: VsCodeFile;
};

const VsCodeFile: FC<VsCodeFileProps> = ({ file }) => {
  return (
    <div className="flex items-center gap-2 pl-12 cursor-pointer">
      {file.icon}
      <span>{file.name}</span>
    </div>
  );
};

export default VsCodeComponent;
