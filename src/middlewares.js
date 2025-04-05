import sharp from 'sharp';
import path from 'path';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  try {
    const originalPath = req.file.path;
    const ext = path.extname(originalPath);
    const filenameNoExt = path.basename(originalPath, ext);
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
