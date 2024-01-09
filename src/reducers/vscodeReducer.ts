import {
  VsCodeFileStorage,
  VsCodeFileType,
  VsCodeFolderType,
} from '@/types/vscodeTypes';
import { v4 as uuidv4 } from 'uuid';

const file1: VsCodeFileType = {
  id: uuidv4(),
  filename: 'about.json',
  content: `
  {
  "mobile": {
    "ko-kr": {
      "callingCode": "45",
      "number": "81 65 59 23"
    },
    "da-dk": {
      "callingCode": "82",
      "number": "10-5519-2783"
    }
  },
  "email": "ehdans04@gmail.com",
  "currentBasedOn": {
    "country": "Denmark",
    "city": "Copenhagen"
  },
  "skills": {
    "languages": [
      { "id": "Korean", "proficiency": "native" },
      { "id": "English", "proficiency": "professional" }
    ],
    "programmings": [
      { "id": "JavaScript", "level": 5 },
      { "id": "Typescript", "level": 5 },
      { "id": "ReactJS", "level": 5 },
      { "id": "NextJS", "level": 5 },
      { "id": "CSS", "level": 5 },
      { "id": "HTML", "level": 5 },
      { "id": "Git", "level": 5 }
    ]
  }
}
  `,
  path: '/test/about.json',
  fileType: 'file',
  isActive: true,
};

const file2: VsCodeFileType = {
  id: uuidv4(),
  filename: 'test.json',
  content: `
  {
    "test": "test
  }
  `,
  path: '/test/test.json',
  fileType: 'file',
  isActive: false,
};

const file3: VsCodeFileType = {
  id: uuidv4(),
  filename: 'something.json',
  content: `
  {
    "name": "dongmoon
  }
  `,
  path: '/test2/test.json',
  fileType: 'file',
  isActive: false,
};

const folder: VsCodeFolderType = {
  id: uuidv4(),
  isActive: true,
  foldername: 'test',
  files: [file1, file2],
  path: '/test',
  fileType: 'folder',
};

const folder2: VsCodeFolderType = {
  id: uuidv4(),
  isActive: false,
  foldername: 'test2',
  files: [file3],
  path: '/test2',
  fileType: 'folder',
};

export type VsCodeState = {
  files: VsCodeFileStorage;
  currentFile?: VsCodeFileType;
  buffers: { id: string; filename: string; isActive: boolean }[];
  fileExplorer: VsCodeFolderType[];
};

export const initialState: VsCodeState = {
  files: [file1, file2, file3],
  currentFile: file1,
  buffers: [{ filename: file1.filename, isActive: true, id: file1.id }],
  fileExplorer: [folder, folder2],
};

// this need to refactor
export const vscodeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_CURRENT_FILE': {
      const newCurrentFile = state.files.find(
        (file) => file.id === action.payload.id
      );
      const existFileBuffer = state.buffers.find(
        (buffer) => buffer.id === action.payload.id
      );

      let newBuffers = state.buffers;

      if (existFileBuffer) {
        newBuffers = state.buffers.map((buffer) => {
          if (buffer.id === existFileBuffer.id) {
            return {
              ...buffer,
              isActive: true,
            };
          } else {
            return {
              ...buffer,
              isActive: false,
            };
          }
        });
      } else {
        newBuffers = [
          ...state.buffers.map((buffer) => {
            return {
              ...buffer,
              isActive: false,
            };
          }),
          {
            filename: newCurrentFile!.filename,
            isActive: true,
            id: newCurrentFile!.id,
          },
        ];
      }

      const newFileExplorer = state.fileExplorer.map((folder) => {
        let isFolderActive = false;

        const updatedFiles = folder.files.map((file) => {
          if (file.id === action.payload.id) {
            isFolderActive = true;
            return { ...file, isActive: true };
          } else {
            return { ...file, isActive: false };
          }
        });

        return {
          ...folder,
          files: updatedFiles,
          isActive: folder.isActive ? true : isFolderActive,
        };
      });

      return {
        ...state,
        currentFile: newCurrentFile,
        buffers: newBuffers,
        fileExplorer: newFileExplorer,
      };
    }

    case 'DELETE_BUFFER': {
      const newBuffers = state.buffers.filter(
        (buffer) => buffer.id !== action.payload.id
      );

      const newFileExplorer = state.fileExplorer.map((folder) => {
        return {
          ...folder,
          files: folder.files.map((file) => {
            return {
              ...file,
              isActive: false,
            };
          }),
        };
      });

      return {
        ...state,
        buffers: newBuffers,
        fileExplorer: newFileExplorer,
      };
    }
    case 'TOGGLE_FOLDER': {
      const newFileExplorer = state.fileExplorer.map((folder) => {
        if (folder.id === action.payload.id) {
          return {
            ...folder,
            isActive: !folder.isActive,
          };
        }
        return {
          ...folder,
        };
      });
      return { ...state, fileExplorer: newFileExplorer };
    }
    default:
      return state;
  }
};
