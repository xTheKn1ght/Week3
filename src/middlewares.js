import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  try {
    const originalPath = req.file.path; // uploads/filename.jpg
    const ext = path.extname(originalPath); // .jpg
    const filenameNoExt = path.basename(originalPath, ext); // filename
    const thumbPath = path.join(req.file.destination, `${filenameNoExt}_thumb.png`);

    await sharp(originalPath)
      .resize(160, 160)
      .png()
      .toFile(thumbPath);

    console.log(`Thumbnail created: ${thumbPath}`);
    next();
  } catch (err) {
    console.error('Error creating thumbnail:', err);
    res.status(500).json({ error: 'Failed to create thumbnail' });
  }
};

export { createThumbnail };
