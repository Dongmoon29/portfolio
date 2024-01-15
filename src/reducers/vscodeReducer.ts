import { VsCodeActions } from '@/actions/vscodeActions';
import { VsCodeState, initialState } from '@/context/VscodeContext';
import {
  VsCodeBuffer,
  VsCodeFileType,
  VsCodeFolderType,
} from '@/types/vscodeTypes';
import { Reducer } from 'react';

const updateIsActive = (
  items: Array<VsCodeFileType | VsCodeFolderType>,
  id: string
): any => {
  return items.map((item: VsCodeFileType | VsCodeFolderType) => {
    if (item.fileType === 'folder') {
      return {
        ...item,
        folders: item.folders ? updateIsActive(item.folders, id) : item.folders,
        files: item.files.map((file) => ({
          ...file,
          isActive: file.id === id,
        })),
      };
    }

    return {
      ...item,
      isActive: item.id === id,
    };
  });
};

const toggleFolder = (
  folders: VsCodeFolderType[],
  targetId: string
): VsCodeFolderType[] => {
  return folders.map((folder) => ({
    ...folder,
    isActive: folder.id === targetId ? !folder.isActive : folder.isActive,
    folders: folder.folders
      ? toggleFolder(folder.folders, targetId)
      : folder.folders,
  }));
};

const getInitialCurrentFile = (
  folders: VsCodeFolderType[],
  files?: VsCodeFileType[]
): VsCodeFileType | undefined => {
  if (files?.length) return files[0];

  for (const folder of folders) {
    if (folder.files?.length) return folder.files[0];

    if (folder.folders?.length) {
      const file = getInitialCurrentFile(folder.folders);
      if (file) return file;
    }
  }

  return undefined;
};

const collectFiles = (folders: VsCodeFolderType[]): VsCodeFileType[] =>
  folders.reduce(
    (allFiles: VsCodeFileType[], folder: VsCodeFolderType) => [
      ...allFiles,
      ...folder.files,
      ...(folder.folders ? collectFiles(folder.folders) : []),
    ],
    []
  );

const setFileStore = (files: VsCodeFileType[], folders: VsCodeFolderType[]) => [
  ...files,
  ...collectFiles(folders),
];
// @ts-ignore
export const vscodeReducer: Reducer<VsCodeState, VsCodeActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'INITIALIZE': {
      const { files, folders } = action.payload.data;
      const currentFile = getInitialCurrentFile(folders, files);
      const buffer = currentFile ? [{ ...currentFile, isActive: true }] : [];
      return {
        ...state,
        currentFile,
        buffers: [buffer],
        fileExplorer: action.payload.data,
        files: setFileStore(files, folders),
      };
    }
    case 'SET_CURRENT_FILE': {
      const fileId = action.payload.id;
      const newCurrentFile = state.files.find((file) => file.id === fileId);
      const updatedBuffers = state.buffers.map((buffer) => ({
        ...buffer,
        isActive: buffer.id === fileId,
      }));
      const bufferToAdd = newCurrentFile
        ? { ...newCurrentFile, isActive: true }
        : null;
      return {
        ...state,
        currentFile: newCurrentFile,
        buffers: state.buffers.some((buffer) => buffer.id === fileId)
          ? updatedBuffers
          : [bufferToAdd]
          ? [...updatedBuffers, bufferToAdd]
          : updatedBuffers,
        fileExplorer: {
          ...state.fileExplorer,
          files: updateIsActive(state.fileExplorer.files, fileId),
          folders: updateIsActive(state.fileExplorer.folders, fileId),
        },
      };
    }
    case 'DELETE_BUFFER': {
      const newBuffers = state.buffers.filter(
        (buffer) => buffer.id !== action.payload.id
      );
      const newCurrentFile =
        newBuffers.length > 0
          ? state.files.find((file) => file.id === newBuffers[0].id)
          : undefined;

      return {
        ...state,
        buffers: newCurrentFile
          ? newBuffers.map((buffer) => ({
              ...buffer,
              isActive: buffer.id === newCurrentFile.id,
            }))
          : newBuffers,
        currentFile: newCurrentFile,
      };
    }
    case 'TOGGLE_FOLDER': {
      return {
        ...state,
        fileExplorer: {
          ...state.fileExplorer,
          folders: toggleFolder(state.fileExplorer.folders, action.payload.id),
        },
      };
    }
    default:
      return state;
  }
};
