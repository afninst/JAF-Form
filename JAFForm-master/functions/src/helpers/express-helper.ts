import * as Express from 'express';

export const getApp = () => {
  const app =Express();

app.use((req, res, next) => {
  /*Clear x-powered-by header*/
  res.set('x-powered-by', '');
  next();
});

 return app;
};

export const sendError = (res: Express.Response, error: Error) => {
console.error(error);
res.status(400).send({
success: false,
message: error.message
});
};