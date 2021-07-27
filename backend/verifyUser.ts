import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const verifyUser = (token: string | undefined) => {
    if (token) {
        try {
            return verify(token, process.env.JWT_SECRET as string);
        } catch (err) {
            throw new Error('Session invalid');
        }
    }
};
