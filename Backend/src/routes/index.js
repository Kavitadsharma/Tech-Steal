const userRouter = require('./user');
const adminRouter = require('./admin');

const productRouter = require('./product');


module.exports = (app) => {
  app.use('/api/v1/user', userRouter);
  app.use('/api/v1/admin', adminRouter);
 app.use('/api/v1/product', productRouter);

};
