import { Router } from "express"
import { getUserById, getUsers, deleteUser, updateUserRole,updateUser, updateProfilePicture } from "./user.controller.js";
import { getUserByIdValidator, getUsersValidator ,deleteUserValidator, updateUserRoleValidator ,updateUserValidator, updateProfilePictureValidator } from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router()

/**
 * @swagger
 * /findUser/{uid}:
 *   get:
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/findUser/:uid", getUserByIdValidator, getUserById)

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get list of users
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Limit number of users
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Offset for users
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Server error
 */
router.get("/", getUsersValidator ,getUsers)

/**
 * @swagger
 * /deleteUser/{uid}:
 *   delete:
 *     summary: Delete user by ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)

/**
 * @swagger
 * /updateUserRole/{uid}:
 *   patch:
 *     summary: Update user role by ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: body
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [ADMIN_ROLE, CLIENT_ROLE]
 *         description: New role
 *     responses:
 *       200:
 *         description: User role updated
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.patch("/updateUserRole/:uid", updateUserRoleValidator, updateUserRole)

/**
 * @swagger
 * /updateUser/{uid}:
 *   put:
 *     summary: Update user by ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: body
 *         name: data
 *         required: true
 *         schema:
 *           type: object
 *         description: User data to update
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Bad request
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put("/updateUser/:uid", updateUserValidator, updateUser)

/**
 * @swagger
 * /updateProfilePicture/{uid}:
 *   patch:
 *     summary: Update user profile picture by ID
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: formData
 *         name: profilePicture
 *         required: true
 *         type: file
 *         description: New profile picture
 *     responses:
 *       200:
 *         description: Profile picture updated
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.patch("/updateProfilePicture/:uid", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture)

export default router
