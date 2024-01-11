'use client';

import { OsxWindowHeader } from './os/macOs/osxWindowHeader';
import { SiGmail } from 'react-icons/si';

export const GmailTemplate = () => {
  return (
    <div className=" flex-col overflow-hidden bg-gray-100 h-full w-full rounded-t-xl min-h-96 rounded-b-xl">
      <div className="flex items-center text-white bg-gray-700 rounded-t-xl gap-3 pt-1.5 px-2">
        <div className="flex justify-start gap-2">
          <OsxWindowHeader title="" />
        </div>
        <div
          className={
            'flex items-center gap-2 bg-gray-100 py-2 px-6 w-44 text-black rounded-t-xl  '
          }>
          <SiGmail />
          gmail
        </div>
        <div></div>
      </div>
      <div className="flex h-full"></div>
    </div>
  );
};
