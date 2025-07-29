import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

const getContentType = (ext: string): string => {
  const mimeTypes: Record<string, string> = {
    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
  };

  return mimeTypes[ext.toLowerCase()] || 'application/octet-stream';
};

const isValidPath = (filePath: string, basePath: string): boolean => {
  const resolvedPath = path.resolve(filePath);
  const resolvedBase = path.resolve(basePath);
  return resolvedPath.startsWith(resolvedBase);
};

export const GET = async (req: NextRequest) => {
  try {
    const filename = req.nextUrl.searchParams.get('uri');

    if (!filename) {
      return NextResponse.json(
        { message: 'URI parameter is required' },
        { status: 400 }
      );
    }

    // 보안: 경로 순회 공격 방지
    const basePath = path.resolve('./db');
    const filePath = path.resolve('./db', filename);

    if (!isValidPath(filePath, basePath)) {
      return NextResponse.json(
        { message: 'Invalid file path' },
        { status: 403 }
      );
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: 'File not found' }, { status: 404 });
    }

    // 파일 통계 확인
    const stats = fs.statSync(filePath);
    if (!stats.isFile()) {
      return NextResponse.json({ message: 'Not a file' }, { status: 400 });
    }

    // 파일 크기 제한 (10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (stats.size > maxSize) {
      return NextResponse.json({ message: 'File too large' }, { status: 413 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const contentType = getContentType(path.extname(filename));

    // PDF 파일인 경우 특별한 헤더 설정
    const headers: Record<string, string> = {
      'content-type': contentType,
      'cache-control': 'public, max-age=3600', // 1시간 캐시
    };

    // PDF 파일의 경우 추가 헤더 설정
    if (contentType === 'application/pdf') {
      headers['content-disposition'] = 'inline';
      headers['x-content-type-options'] = 'nosniff';
      // PDF 렌더링을 위해 더 관대한 설정
      headers['x-frame-options'] = 'ALLOWALL';
      headers['access-control-allow-origin'] = '*';
      headers['access-control-allow-methods'] = 'GET, POST, OPTIONS';
      headers['access-control-allow-headers'] = 'Content-Type';
    }

    const response = new NextResponse(fileBuffer, {
      headers,
    });

    return response;
  } catch (error: unknown) {
    console.error('Media API Error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
};
