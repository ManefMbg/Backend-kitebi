import jwt from "jsonwebtoken";
import {User} from "../models/User.js"


const isAuth = async (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      if (!token) {
        return res
          .status(401)
          .send({ errors: [{ msg: "Not authorized !! no token" }] });
      }
  
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const foundUser = await User.findOne({ _id: decoded.id });
      if (!foundUser) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Not authorized !!  not found user" }] });
      }
      req.user = foundUser;
      next();
    } catch (error) {
      res.status(401).send({ errors: [{ msg: "Not authorized !!3" }] });
    }
  };
  
  export default isAuth;