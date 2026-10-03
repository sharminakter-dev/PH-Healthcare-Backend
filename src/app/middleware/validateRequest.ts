import z from "zod"
import { catchAsync } from "../utils/catchAsync"
import { NextFunction, Request, Response } from "express"

export const validateRequest = (zodSchema: z.ZodObject)=>{
	return catchAsync((req: Request, res: Response, next: NextFunction)=>{

			const payload = req.body ?? {}

			const result = zodSchema.safeParse(payload)

				if(!result.success){
					console.log(result.error)
					console.log("Isuues------",result.error.issues)
					let errorMsg = ""
					result.error.issues.forEach((issue)=>{
						errorMsg = errorMsg+","+issue.message
					})
					throw new Error(errorMsg)
				}

				req.body = result.data
			next()
	})
}