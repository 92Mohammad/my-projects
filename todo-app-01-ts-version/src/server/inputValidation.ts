import { z } from 'zod'
import { Request, Response, NextFunction }from 'express'
export const UserSchema = z.object({
    email: z.string().email().min(1).max(20),
    password: z.string().min(1).max(10)
})


export const parseInputData = (req: Request, res: Response, next: NextFunction) => {

    const parseInput = UserSchema.safeParse(req.body);
    if (parseInput.success){
        req.body.email = parseInput.data.email;
        req.body.password =  parseInput.data.password;
        next();
    }
    else {
        return res.status(411).json({error: parseInput.error})
    }

}
