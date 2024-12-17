import { z } from "zod";

export const RegisterUserDto = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional()
  })
});

export const LoginUserDto = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string()
  })
})

export type RegisterUserInput = z.infer<typeof RegisterUserDto>['body'];
export type LoginUserInput = z.infer<typeof LoginUserDto>['body'];
