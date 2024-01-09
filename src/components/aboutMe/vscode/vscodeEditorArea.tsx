import { FC } from 'react';

type VsCodeEditorAreaProps = {
  content?: string;
};

export const VsCodeEditorArea: FC<VsCodeEditorAreaProps> = ({ content }) => {
  const contents = typeof content === 'string' ? content : '';
  const lines = contents.split('\n');
  return (
    <div className="bg-gray-100 w-full flex-1 text-black flex gap-2 overflow-auto">
      <div className="flex flex-col">
        {lines.map((_, index) => (
          <div className={'bg-gray-100 w-14 text-center'} key={index}>
            {index + 1}
          </div>
        ))}
      </div>
      <div>
        <pre>
          <code>{contents ?? ''}</code>
        </pre>
      </div>
    </div>
  );
};
