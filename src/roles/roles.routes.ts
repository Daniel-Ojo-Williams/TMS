import { Router } from "express";
import { EnsureAuthenticated } from "../middlewares/authentication";
import rolesController from "./roles.controller";
import { AdminOnly } from "../middlewares/adminOnly";

const router = Router();

router.get('/api/v1/roles', EnsureAuthenticated, AdminOnly, rolesController.getAllRoles);
router.get('/api/v1/permissions', EnsureAuthenticated, AdminOnly, rolesController.getAllPermissions);

export default router;
