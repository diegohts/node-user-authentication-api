import { NextFunction, Response, Request, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";


const authorizationRoute = Router();


authorizationRoute.post('/token', (req: Request, res: Response, next: NextFunction) => {
    try{
        const authorizationHeaders = req.headers['authorization'];
        
        if(!authorizationHeaders){
            throw new ForbiddenError('Credenciais não informadas!');
        }

        //Basic YWRtaW46YWRtaW4=
        const [authenticationType, token] = authorizationHeaders.split(' ');

        if(authenticationType !== 'Basic' || !token){
            throw new ForbiddenError('Tipo de autenticação inválida!');
        }

    } catch(error) {
        next(error);
    }

});

export default authorizationRoute;