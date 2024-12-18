import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/authentication";
import rolesController from "./roles.controller";
import { adminOnly } from "../middlewares/adminOnly";

const router = Router();

router.get('/api/v1/roles', ensureAuthenticated, adminOnly, rolesController.getAllRoles);
router.get('/api/v1/permissions', ensureAuthenticated, adminOnly, rolesController.getAllPermissions);

export default router;
