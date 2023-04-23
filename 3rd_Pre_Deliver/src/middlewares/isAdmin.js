import UserService from '../services/userService.js';

const userService = new UserService();

export const isAdmin = async (req, res, next) => {
  
  const user = await userService.getUserByUsername(req.user.email);

  console.log(user.role);

  if (user?.role === "admin") {
    next();
  } else {
    res.status(401).send({
      status: 'Unauthorized',
      message: 'Unauthorized',
      code: 401,
    });
  }
};