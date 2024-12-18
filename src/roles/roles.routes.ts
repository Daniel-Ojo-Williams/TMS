import { Router } from "express";
import { EnsureAuthenticated } from "../middlewares/authentication";
import rolesController from "./roles.controller";

const router = Router();

router.get('/api/v1/roles', EnsureAuthenticated, rolesController.getAllRoles);
router.get('/api/v1/permissions', EnsureAuthenticated, rolesController.getAllPermissions);

export default router;
