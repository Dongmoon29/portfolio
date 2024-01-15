import Image from 'next/image';
import { FC } from 'react';

type FileIconProps = {
  filename: string;
  size: number;
};

export const FileIcon: FC<FileIconProps> = ({ filename, size }) => {
  let icon = (
    <div className="min-w-4">
      <Image
        src={'/svgs/default_file.svg'}
        priority
        height={size}
        width={size}
        alt="icon"
      />
    </div>
  );

  if (filename.endsWith('.json')) {
    icon = (
      <div className="min-w-4">
        <Image
          src={'/svgs/json.svg'}
          priority
          height={size}
          width={size}
          alt="icon"
        />
      </div>
    );
  }
  if (filename.endsWith('.tsx')) {
    icon = (
      <div className="min-w-4">
        <Image
          src={'/svgs/tsx.svg'}
          priority
          height={size}
          width={size}
          alt="icon"
        />
      </div>
    );
  }
  if (filename.endsWith('.ts')) {
    icon = (
      <div className="min-w-4">
        <Image
          src={'/svgs/ts.svg'}
          priority
          height={size}
          width={size}
          alt="icon"
        />
      </div>
    );
  }
  if (filename.endsWith('.pdf')) {
    icon = (
      <div className="min-w-4">
        <Image
          src={'/svgs/pdf.svg'}
          priority
          height={size}
          width={size}
          alt="icon"
        />
      </div>
    );
  }

  if (filename.endsWith('.md')) {
    icon = (
      <div className="min-w-4">
        <Image
          src={'/svgs/md.svg'}
          priority
          height={size}
          width={size}
          alt="icon"
        />
      </div>
    );
  }
  if (filename.endsWith('.txt')) {
    icon = (
      <div className="min-w-4">
        <Image
          src={'/svgs/txt.svg'}
          priority
          height={size}
          width={size}
          alt="icon"
        />
      </div>
    );
  }
  if (
    filename.endsWith('.png') ||
    filename.endsWith('.jpg') ||
    filename.endsWith('.jpeg')
  ) {
    icon = (
      <div className="min-w-4">
        <Image
          src={'/svgs/image.svg'}
          priority
          height={size}
          width={size}
          alt="icon"
        />
      </div>
    );
  }

  return icon;
};

type FolderIconProps = {
  isOpen?: boolean;
};

export const FolderIcon: FC<FolderIconProps> = ({ isOpen }) => {
  let icon = isOpen ? (
    <div>
      <Image
        src={'/svgs/default_folder_opened.svg'}
        priority
        height={16}
        width={16}
        alt="icon"
      />
    </div>
  ) : (
    <div>
      <Image
        src={'/svgs/default_folder.svg'}
        priority
        height={16}
        width={16}
        alt="icon"
      />
    </div>
  );
  return icon;
};
