import { Router } from "express"
import { getUserById, getUsers, deleteUser, updateUserRole,updateUser, updateProfilePicture } from "./user.controller.js";
import { getUserByIdValidator, getUsersValidator ,deleteUserValidator, updateUserRoleValidator ,updateUserValidator, updateProfilePictureValidator } from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router()

router.get("/findUser/:uid", getUserByIdValidator, getUserById)
router.get("/", getUsersValidator ,getUsers)
router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)
router.patch("/updateUserRole/:uid", updateUserRoleValidator, updateUserRole)
router.put("/updateUser/:uid", updateUserValidator, updateUser)
router.patch("/updateProfilePicture/:uid", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture)
export default router
