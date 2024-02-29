import { z } from 'zod'

export const userFormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Your first name need to have at least 2 characters.'
  }),
  lastName: z.string().min(2, {
    message: 'Your last name need to have at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Your email is invalid'
  }),
  telephone: z.string(),
  role: z.enum(["ADMIN", "MODERATOR", "SUBSCRIBER", "MEMBER"]).optional()
})

export const editUserFormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Your first name need to have at least 2 characters.'
  }).optional(),
  lastName: z.string().min(2, {
    message: 'Your last name need to have at least 2 characters.'
  }).optional(),
  email: z.string().email({
    message: 'Your email is invalid'
  }).optional(),
  telephone: z.string().optional(),
  role: z.enum(["ADMIN", "MODERATOR", "SUBSCRIBER", "MEMBER"]).optional()
})