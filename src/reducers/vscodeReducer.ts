import { initialState } from '@/context/VscodeContext';
import { VsCodeFileType, VsCodeFolderType } from '@/types/vscodeTypes';

const updateIsActive = (
  items: Array<VsCodeFileType | VsCodeFolderType>,
  id: string
): (VsCodeFileType | VsCodeFolderType)[] => {
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

const toggleFolder: VsCodeFolderType[] = (
  folders: VsCodeFolderType[],
  targetId: string
) => {
  return folders.map((folder) => ({
    ...folder,
    isActive: folder.id === targetId ? !folder.isActive : folder.isActive,
    folders: folder.folders
      ? toggleFolder(folder.folders, targetId)
      : folder.folders,
  }));
};

const getInitialCurrentFile = (
  files?: VsCodeFileType[],
  folders: VsCodeFolderType[]
) => {
  if (files?.length) return files[0];
  if (folders?.length)
    return getInitialCurrentFile(folders[0].files, undefined);
  return null;
};

const collectFiles = (folders) =>
  folders.reduce(
    (allFiles, folder) => [
      ...allFiles,
      ...folder.files,
      ...(folder.folders ? collectFiles(folder.folders) : []),
    ],
    []
  );

const setFileStore = (files = [], folders = []) => [
  ...files,
  ...collectFiles(folders),
];

export const vscodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE': {
      const { files, folders } = action.payload.data;
      const currentFile = getInitialCurrentFile(files, folders);
      return {
        ...state,
        currentFile,
        buffers: [currentFile],
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
      return {
        ...state,
        currentFile: newCurrentFile,
        buffers: state.buffers.some((buffer) => buffer.id === fileId)
          ? updatedBuffers
          : [...updatedBuffers, { ...newCurrentFile, isActive: true }],
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
          : null;

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
