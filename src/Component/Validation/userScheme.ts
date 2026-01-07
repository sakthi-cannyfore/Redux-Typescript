import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(3, "Name must be 3 letter"),
  email: z.email("Invalid Email"),
  phone: z.string().min(10, "Please Enter the Valid Phone Number"),
  password: z.string().min(6, "The Password length minimun 6 charecters"),
  gender: z.enum(["male", "female", "other"]),
  dob: z.string().optional(),
  address: z.string().min(5, "Address is required"),
  isActive: z.boolean().optional(),
});

export type UserFormData = z.infer<typeof UserSchema>;
