const asyncWrapper = require('../utils/async-wrapper');

class BaseController {
  constructor() {
    this.asyncWrapper = asyncWrapper;
  }
}

module.exports = BaseController;
