import z from "zod";

const PatientRegistrationZodSchema = z.object({
	name: z.string("Not a String").min(3, {error:"Name must be atleast 3 character long"}).max(10, {error:"Name cannot be more than 10 character long"}),
	email: z.email("Not a valid email"),
	password: z.string().
				min(8, { message: "Password must be at least 8 character longs" })
				.max(20, { message: "Password cannot exceed 20 characters" })
				.regex(
					/[A-Z]/,
					"Password must contain  atleast one uppercase letters"
				)
				.regex(
					/[a-z]/,
					"Password must contain atleast one lowercae letters"
				)
				.regex(
					/[0-9]/,
					"Password must contain atleast one number"
				)
				.regex(
					/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]';`~]/,
					"Password must  contain special characters"
				),
	patient: z.object({
		contactNumber: z.string().optional()
	}).optional()
})

const PatientEmailVerifyZodSchema = z.object({
	email: z.email("Not a valid email"),
	otp: z.string().length(6)
})

const loginZodSchema = z.object({
	email: z.email("Not a valid email"),
	password: z.string().
				min(8, { message: "Password must be at least 8 character longs" })
				.max(20, { message: "Password cannot exceed 20 characters" })
				.regex(
					/[A-Z]/,
					"Password must contain  atleast one uppercase letters"
				)
				.regex(
					/[a-z]/,
					"Password must contain atleast one lowercae letters"
				)
				.regex(
					/[0-9]/,
					"Password must contain atleast one number"
				)
				.regex(
					/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]';`~]/,
					"Password must  contain special characters"
				),
})

const forgotPasswordZodSchema = z.object({
	email: z.string("Password is required")
})

const resetPasswordZodSchema =  z.object({
	email: z.string("Password is required"),
	newPassword:  z.string().
				min(8, { message: "Password must be at least 8 character longs" })
				.max(20, { message: "Password cannot exceed 20 characters" })
				.regex(
					/[A-Z]/,
					"Password must contain  atleast one uppercase letters"
				)
				.regex(
					/[a-z]/,
					"Password must contain atleast one lowercae letters"
				)
				.regex(
					/[0-9]/,
					"Password must contain atleast one number"
				)
				.regex(
					/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]';`~]/,
					"Password must  contain special characters"
				),
	otp: z.string("Otp is required").length(6)

})

export const UserValidation = {
    PatientRegistrationZodSchema,
	PatientEmailVerifyZodSchema,
    loginZodSchema,
	forgotPasswordZodSchema,
	resetPasswordZodSchema
}