import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().min(1).max(100),
  password: z.string().min(1).max(100),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const registerSchema = signInSchema
  .extend({
    // name: z.string().min(1).max(100),
    confirmPassword: z.string().min(1).max(100),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
