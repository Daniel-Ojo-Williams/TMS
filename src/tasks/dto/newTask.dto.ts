import { z } from "zod";

export const TaskDto = z.object({
  body: z.object({
    title: z.string().max(100),
    description: z.string().optional(),
    dueDate: z.string().date().optional(),
    status: z.enum(['pending', 'completed', 'in-progress']).optional()
  })
});

export const Pagination = z.object({
  query: z.object({
    size: z.string().transform((limit, ctx) => {
      if (limit && !isNaN(parseInt(limit))) {
        return parseInt(limit)
      } else {
        ctx.addIssue({
          code: 'custom',
          message: 'limit should be a valid number'
        })
      }
    }).optional(),
    page: z.string().transform((skip, ctx) => {
      if (skip && !isNaN(parseInt(skip))) {
        return parseInt(skip)
      } else {
        ctx.addIssue({
          code: 'custom',
          message: 'skip should be a valid number'
        })
      }
    }).optional(),
    status: z.enum(['pending', 'completed', 'in-progress']).optional(),
    deleted: z.enum(['true', 'false']).optional()
  })
})

export type TaskInput = z.infer<typeof TaskDto>['body'];
export type PaginationQuery = z.infer<typeof Pagination>['query'];
