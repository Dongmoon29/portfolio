import { VsCodeFileType, VsCodeFolderType } from '@/types/vscodeTypes';

const INITIALIZE = 'INITIALIZE';
const SET_CURRENT_FILE = 'SET_CURRENT_FILE';
const DELETE_BUFFER = 'DELETE_BUFFER';
const TOGGLE_FOLDER = 'TOGGLE_FOLDER';

interface InitializeAction {
  type: typeof INITIALIZE;
  payload: {
    data: {
      files: VsCodeFileType[];
      folders: VsCodeFolderType[];
    };
  };
}

interface SetCurrentFileAction {
  type: typeof SET_CURRENT_FILE;
  payload: {
    id: string; // Assuming id is a string, adjust the type accordingly
  };
}

interface DeleteBufferAction {
  type: typeof DELETE_BUFFER;
  payload: {
    id: string;
  };
}

interface ToggleFolderAction {
  type: typeof TOGGLE_FOLDER;
  payload: {
    id: string;
  };
}
export type VsCodeActions =
  | InitializeAction
  | SetCurrentFileAction
  | DeleteBufferAction
  | ToggleFolderAction;
