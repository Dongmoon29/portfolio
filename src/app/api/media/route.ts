import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export const GET = async (req: NextRequest) => {
  const filename = req.nextUrl.searchParams.get('uri');
  if (!filename) {
    return;
  }

  const filePath = path.resolve('./db', filename);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ message: 'File not found', status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);
  // Determine the content type based on the file extension
  const contentType = getContentType(path.extname(filename));
  const res = new NextResponse(fileBuffer, {
    headers: {
      'content-type': contentType,
    },
  });
  return res;
};
function getContentType(ext: string) {
  const mimeTypes: { [key: string]: string } = {
    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
  };

  return mimeTypes[ext.toLowerCase()] || 'application/octet-stream';
}
