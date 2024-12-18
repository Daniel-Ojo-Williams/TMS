import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/authentication";
import rolesController from "./roles.controller";
import { adminOnly } from "../middlewares/adminOnly";
import { NewRoleDto } from "./dto/newRole.dto";
import { Validator } from "../middlewares/validator";
import { AssignRoleDto } from "./dto/assignRole";

const router = Router();

router.get('/api/v1/roles', ensureAuthenticated, adminOnly, rolesController.getAllRoles);
router.get('/api/v1/permissions', ensureAuthenticated, adminOnly, rolesController.getAllPermissions);
router.post('/api/v1/roles', ensureAuthenticated, adminOnly, Validator(NewRoleDto), rolesController.createRole);
router.patch('/api/v1/roles/user', ensureAuthenticated, adminOnly, Validator(AssignRoleDto), rolesController.updateUserRole);

export default router;
