import { randomBytes } from 'crypto';
import { diskStorage } from 'multer';
import { resolve } from 'path';

export const TMP_FOLDER = resolve(__dirname, '..', '..', 'var/tmp');

export const UPLOADS_FOLDER = resolve(TMP_FOLDER, 'uploads');

export const storage = diskStorage({
  destination: TMP_FOLDER,
  filename(request, file, callback) {
    const fileHash = randomBytes(10).toString('hex');
    const fileName = `${fileHash}-${file.originalname}`;

    return callback(null, fileName);
  },
});
