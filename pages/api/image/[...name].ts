import {apiHandler} from '../../../common/api/handler';
import {oss} from '../../../src/api/aliyun';

export default apiHandler({
  handler: {
    GET: async ({helper, res}) => {
      const name = helper.museQueryJoin('name');
      const resp = await oss.getStream(`image/${name}`);
      res.writeHead(resp.res.status, {
        ...resp.res.headers,
      });
      resp.stream.pipe(res);
    },
  },
});