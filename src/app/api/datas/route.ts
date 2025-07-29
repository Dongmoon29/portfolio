import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { VsCodeFileType, VsCodeFolderType } from '@/types/vscodeTypes';
import { NextResponse } from 'next/server';
import { FILE_EXTENSIONS } from '@/utils/constants';

const dbPath = path.join(process.cwd(), 'db');

const readDirectory = async (
  directoryPath: string,
  parentPath = ''
): Promise<{ files: VsCodeFileType[]; folders: VsCodeFolderType[] }> => {
  try {
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
            fileType: 'folder' as const,
            isActive: false,
            ...directoryContents,
          };
        } else {
          // Check if the file is an image or a PDF
          const isImage = FILE_EXTENSIONS.IMAGE.some((ext) =>
            dirent.name.endsWith(ext)
          );
          const isPdf = dirent.name.endsWith(FILE_EXTENSIONS.PDF);

          if (isImage || isPdf) {
            return {
              id: uuidv4(),
              filename: dirent.name,
              content: { src: `${itemPath}` },
              path: `/${itemPath}`,
              fileType: 'file' as const,
              isActive: false,
            };
          } else {
            try {
              const content = await fs.promises.readFile(resPath, 'utf8');
              return {
                id: uuidv4(),
                filename: dirent.name,
                content,
                path: `/${itemPath}`,
                fileType: 'file' as const,
                isActive: false,
              };
            } catch (readError) {
              console.error(`Error reading file ${resPath}:`, readError);
              return {
                id: uuidv4(),
                filename: dirent.name,
                content: `Error reading file: ${
                  readError instanceof Error
                    ? readError.message
                    : 'Unknown error'
                }`,
                path: `/${itemPath}`,
                fileType: 'file' as const,
                isActive: false,
              };
            }
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

    return { files, folders };
  } catch (error) {
    console.error('Error reading directory:', error);
    throw new Error(
      `Failed to read directory: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};

export const GET = async () => {
  try {
    // Check if db directory exists
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json(
        { message: 'Database directory not found' },
        { status: 404 }
      );
    }

    const data = await readDirectory(dbPath);
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error('API Error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Something went wrong';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
};
