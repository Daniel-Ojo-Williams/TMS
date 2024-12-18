import { z } from "zod";
import { Permissions } from "../../utils/seedRoles&Permissions";

export const NewRoleDto = z.object({
  body: z.object({
    role: z.string(),
    permissions: z.array(z.string()).superRefine((val, ctx) => {
      const permissions = Object.values(Permissions)
      for (const p of val) {
        if (!permissions.includes(p as Permissions)) ctx.addIssue({
          code: 'custom',
          message: `Invalid permission: ${p}`
        })
      }
    }),
  })
})

export type NewRoleInput = z.infer<typeof NewRoleDto>['body'];
