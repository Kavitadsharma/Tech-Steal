const AdminService = require('../../services/admin.service');

const BaseController = require('../base.controller');

class AdminController extends BaseController {
  constructor() {
    super();
    this.service = AdminService;
 
  }

  login() {
    return this.asyncWrapper(async (req) => {
      const { email, password } = req.body;

      const token = await this.service.login(email, password);

      return { data: token };
    });
  }


}

module.exports = new AdminController();
