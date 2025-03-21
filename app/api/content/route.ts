// app/api/content/route.js
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
  // Get the file path from the URL
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get('path');
  
  // For security, only allow paths within the content directory
  // and prevent path traversal attacks
  if (!filePath || filePath.includes('..')) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }
  
  try {
    // Resolve the path relative to the public directory
    const fullPath = path.join(process.cwd(), 'public', filePath);
    const fileContent = await fs.readFile(fullPath, 'utf8');
    
    return NextResponse.json({ content: fileContent });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}