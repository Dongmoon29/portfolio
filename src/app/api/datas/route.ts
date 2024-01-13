import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { VsCodeFileType, VsCodeFolderType } from '@/types/vscodeTypes';
import { NextResponse } from 'next/server';

const dbPath = path.join(process.cwd(), 'db');

const readDirectory = async (
  directoryPath: string,
  parentPath = ''
): Promise<{ files: VsCodeFileType[]; folders: VsCodeFolderType[] }> => {
  const dirents = await fs.promises.readdir(directoryPath, {
    withFileTypes: true,
  });
  const filesAndFolders = await Promise.all(
    dirents.map(async (dirent) => {
      const resPath = path.resolve(directoryPath, dirent.name);
      const itemPath = path.join(parentPath, dirent.name);

      if (dirent.isDirectory()) {
        const directoryContents = await readDirectory(resPath, itemPath);
        return {
          id: uuidv4(),
          foldername: dirent.name,
          path: `/${itemPath}`,
          fileType: 'folder',
          isActive: false,
          ...directoryContents,
        };
      } else {
        // Check if the file is an image or a PDF
        const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
        const isImage = imageExtensions.some((ext) =>
          dirent.name.endsWith(ext)
        );
        const isPdf = dirent.name.endsWith('.pdf');

        if (isImage || isPdf) {
          return {
            id: uuidv4(),
            filename: dirent.name,
            content: { src: `${itemPath}` }, // Set the content to an object with src
            path: `/${itemPath}`,
            fileType: 'file',
            isActive: false,
          };
        } else {
          const content = await fs.promises.readFile(resPath, 'utf8');
          return {
            id: uuidv4(),
            filename: dirent.name,
            content,
            path: `/${itemPath}`,
            fileType: 'file',
            isActive: false,
          };
        }
      }
    })
  );

  // Separate files and folders into their respective arrays
  const files = filesAndFolders.filter(
    (item) => item.fileType === 'file'
  ) as VsCodeFileType[];
  const folders = filesAndFolders.filter(
    (item) => item.fileType === 'folder'
  ) as VsCodeFolderType[];

  // If the function is at the root 'db' directory, return the contents, otherwise, return a folder structure
  return { files, folders };
};

// need to figure out why it calls 4 times
export const GET = async () => {
  try {
    const data = await readDirectory(dbPath);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
};
