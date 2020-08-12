import { Func, Inject, Provide } from '@midwayjs/decorator';
import { FaaSContext, FunctionHandler } from '@midwayjs/faas';

@Provide()
@Func('water.handler')
export class WaterService implements FunctionHandler {
  @Inject()
  ctx: FaaSContext; // context

  async handler() {
    return 'hello world';
  }
}
