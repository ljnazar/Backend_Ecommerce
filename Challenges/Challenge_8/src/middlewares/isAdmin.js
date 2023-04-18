import UserService from '../services/userService.js';

const userService = new UserService();

const isAuth = async (req, res, next) => {
  
  const user = await userService.getUserByUsername(req.user.email);

  console.log(user.role);

  if (user?.role === "admin") {
    next();
  } else {
    res.status(401).send({
      status: "Unauthorized",
      message: "No posee la autorización para realizar esta acción",
      code: 401,
    });
  }
};

export default isAuth;