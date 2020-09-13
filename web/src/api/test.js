import BaseModule from './base.js';

const url = 'api/test';

class Test extends BaseModule {
  constructor() {
    super(url, 3000);
  }

    test() {
    return this.post('/test', {
    })
  }
}

export default new Test()
