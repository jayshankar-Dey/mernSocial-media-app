const { z } = require('zod')

const registerSchema = z.object({
    name: z.string({ required_error: "name is required" }).min(3, { message: "name minimum 3 character" }).trim(),

    email: z.string({ required_error: "email is required" }).email({ message: "please enter valide email" }),

    password: z.string({ required_error: "password is required" }).min(6, { message: "password min 6 character" }).trim(),

    cnfpassword: z.string({ required_error: "confirm_password is required" }).min(6, { message: "confirm_password min 6 character" }).trim(),
})

module.exports = registerSchema