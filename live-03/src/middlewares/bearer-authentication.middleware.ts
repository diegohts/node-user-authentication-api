import { NextFunction, Response ,Request } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from 'jsonwebtoken';
import userRepository from "../repositories/user.repository";

async function bearerAuthenticationMiddleware(req: Request, res: Response, next: NextFunction){

    try {

        const authorizationHeader = req.headers['authorization'];

        if(!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if (authenticationType !== 'Bearer' || !token) {
            throw new ForbiddenError('Tipo de authenticação inválido');
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

        const [username, password] = tokenContent.split(':');

        const tokenPayload = JWT.verify(token, 'temy_secret_key');

        if(typeof tokenPayload !== 'object' || !tokenPayload.sub){
            throw new ForbiddenError('Token inválido');
            
        }

        const uuid = tokenPayload.sub;
        const user = {
            uuid: tokenPayload.sub,
            username: tokenPayload.username
        };

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }

}

export default bearerAuthenticationMiddleware;