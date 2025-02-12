import { Router } from "express"
import { getUserById, getUsers, deleteUser, updateUser, updateProfilePicture } from "./user.controller.js";
import { getUserByIdValidator, deleteUserValidator, updateUserValidator, updateProfilePictureValidator } from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router()

router.get("/findUser/:uid", getUserByIdValidator, getUserById)
router.get("/", getUsers)
router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)
router.put("/updateUser/:uid", updateUserValidator, updateUser)
router.patch("/updateProfilePicture/:uid", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture)
export default router
