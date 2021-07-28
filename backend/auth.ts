import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

config();

export interface AuthRequest extends Request {
    user?: {
        id: string;
        username: string;
    };
}

/*
 *  Add user to request if authenticated
 */
export const isAuthenticated = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;

        if (token) {
            let user = verify(token, process.env.JWT_SECRET as string);

            if (user) {
                user = user as JwtPayload;

                req.user = {
                    id: user.id,
                    username: user.username
                };
            }
        }

        next();
    } catch (error) {
        next();
    }
};

/*
 *  Check if authenticated.
 *  If not, do not go to next function.
 */
export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user) {
        next();
    } else {
        res.json({
            sucess: false,
            message: 'Please login to continue'
        });
    }
};
