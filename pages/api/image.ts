import formidable from 'formidable';
import * as fs from 'fs';
import path from 'path';
import {apiError, apiHandler} from '../../common/api/handler';
import {randomStr} from '../../common/util/random';
import {oss} from '../../src/api/aliyun';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiHandler({
  handler: {
    POST: async ({req, res}) => {
      const form = formidable();
      await new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
          try {
            if (err) {
              reject(apiError(500, err));
              return;
            }
            const image = files.image;
            if (!image) {
              reject(apiError(400, 'must provide image'));
              return;
            }
            if (Array.isArray(image)) {
              reject(apiError(400, 'only allow 1 image'));
              return;
            }
            const filepath = path.parse(image.originalFilename);
            const filename = `${filepath.name}-${randomStr(6)}${filepath.ext}`;
            const resp = await oss.putStream(`image/${filename}`,
              fs.createReadStream(image.filepath), {
                mime: image.mimetype,
              } as any);
            res.status(200).json({
              name: resp.name,
              path: `/api/image/${filename}`,
            });
          } catch (e) {
            reject(e);
          }
        });
      });
    },
  },
});