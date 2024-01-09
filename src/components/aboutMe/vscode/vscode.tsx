'use client';

import { FC, useContext } from 'react';
import { OsxWindowButtons } from '../../osxWindowButtons';
import { VscodeContext } from '@/context/VscodeContext';
import { VsCodeBuffers } from './vscodeBuffers';
import { VsCodeEditorArea } from './vscodeEditorArea';
import { VscodeSidebar } from './sidebar/vscodeSidebar';

const VsCodeComponent: FC = () => {
  const { state } = useContext(VscodeContext);

  return (
    <div className="flex flex-col overflow-auto bg-gray-100 rounded-t-xl h-full w-full rounded-b-xl">
      <div className="grid grid-cols-3 justify-center items-center text-white bg-gray-700 rounded-t-xl p-2 h-10">
        <div className="flex justify-start gap-2">
          <OsxWindowButtons />
        </div>
        <div className="flex justify-center">
          <h1>{state.currentFile?.filename ?? 'vscode'}</h1>
        </div>
        <div></div>
      </div>
      <div className="flex flex-col overflow-auto bg-gray-100 rounded-t-xl h-full w-full rounded-b-xl">
        <div className="flex flex-1 min-h-0">
          <VscodeSidebar />
          <div className="flex flex-col flex-1 w-full bg-gray-200 overflow-auto">
            <VsCodeBuffers />
            <VsCodeEditorArea
              content={state.currentFile?.content ?? 'Pick a file'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VsCodeComponent;
