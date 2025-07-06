import { Response } from "express";

export enum HttpStatus{
    OK=200,
    NOT_FOUND = 404,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    INTERNAL_SERVER_ERROR= 500
}

export class HttpResponse{
    Ok(res:Response,data?: any):Response{
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            statusMessage: "Success",
            data: data,
        })

    }
     NotFound(res:Response,data?: any):Response{
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            statusMessage: "Not Found",
            error: data,
        })


    }
     Unauthorized(res:Response,data?: any):Response{
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            statusMessage: "unauthorized",
            data: data,
        })

    }
     Forbidden(res:Response,data?: any):Response{
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            statusMessage: "Forbidden",
            data: data,
        })


    }
     InternalServerError(res:Response,data?: any):Response{
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            statusMessage: "Internal Server Error",
            data: data,
        })

    }
}