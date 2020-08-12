import { Func, Inject, Provide } from '@midwayjs/decorator';
import { FaaSContext, FunctionHandler } from '@midwayjs/faas';
import { robotUri } from '../private/config';

const request = require('request-promise');

@Provide()
@Func('water.handler')
export class WaterService implements FunctionHandler {
  @Inject()
  ctx: FaaSContext; // context

  async handler() {
    const query = this.ctx.req.pathParameters || {};
    const data = {
      msgtype: 'text',
      text: {
        content: `呐呐~ ${query.message || ''}`
      },
      at: {
        atMobiles: [],
        isAtAll: false
      }
    };

    const result = await request(robotUri, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json'
      },
      json: true
    });

    return result;
  }
}
