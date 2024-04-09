const BaseController = require('../base.controller.js');
const userService = require('../../services/user.service.js');

class UserController extends BaseController {
  constructor() {
    super();
    this.service = userService;
  }

  signup() {
    return this.asyncWrapper(async (req) => {
      const user = await this.service.signup(req.body);

      return {
        data: user.toJSON(),
        message: 'User registered successfully',
        statusCode: 201,
      };
    });
  }

  login() {
    return this.asyncWrapper(async (req) => {
      const { phone,password} = req.body;

   const user=   await this.service.login(phone,password);

      return {
        data: user,
        message: 'Login',
      };
    });
  }
getUser() {
    return this.asyncWrapper(async (req) => {
      const { _id: userId } = req.user;
      const user = await this.service.getUser(userId);

      return {
        data: user,
        message: 'user Data',
      };
    });
  }
  updateUser() {
    return this.asyncWrapper(async (req) => {
      const { _id: userId } = req.user;

      const userUpdates = req.body;
      const updatedUser = await this.service.updateUser(userUpdates, userId);

      return {
        data: updatedUser.toJSON(),
        message: 'user updated successfully',
        statusCode: 200,
      };
    });
  }

  getAllUsers() {
    return this.asyncWrapper(async (req) => {
      const data = await this.service.getAllUsers(req.query);

      return { data };
    });
  }
  userForAdmin() {
    return this.asyncWrapper(async (req) => {
      const { id } = req.params;
      console.log("id: ", id)
      const user = await this.service.userForAdmin(id);

      return {
        data: user,
        message: 'user information retrieve',
        statusCode: 201,
      };
    });
  }
}

module.exports = new UserController();
