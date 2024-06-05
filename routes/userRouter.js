import express from "express";
import {
  deleteUser,
  getOneUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import isAuth from "../middleware/isAuth.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/all", getUsers);
router.get("/:id", getOneUser);
router.put("/:id", isAuth, updateUser);
router.delete("/:id", isAdmin, deleteUser);

export { router as UserRouter };