import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { stat, mkdir } from 'fs/promises';

// Function to ensure directory exists
async function ensureDirExists(dirPath: string) {
  try {
    await stat(dirPath);
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      try {
        await mkdir(dirPath, { recursive: true });
        console.log(`Created directory: ${dirPath}`);
      } catch (mkdirError) {
        console.error(`Error creating directory ${dirPath}:`, mkdirError);
        throw mkdirError; // re-throw error if directory creation fails
      }
    } else {
      throw e; // re-throw other errors
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    // Basic validation for file type (optional, but recommended)
    if (!file.type.startsWith('image/')) {
        return NextResponse.json({ error: "Invalid file type. Only images are allowed." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique filename (e.g., timestamp + original name)
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    
    // Define the upload directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'blogs');
    
    // Ensure the upload directory exists
    await ensureDirExists(uploadDir);
      
    const filePath = path.join(uploadDir, filename);

    await writeFile(filePath, buffer);
    console.log(`File uploaded to ${filePath}`);

    const publicUrl = `/uploads/blogs/${filename}`;
    return NextResponse.json({ success: true, url: publicUrl });

  } catch (error) {
    console.error("Error uploading file:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error during file upload';
    return NextResponse.json({ success: false, error: "File upload failed.", details: errorMessage }, { status: 500 });
  }
}
