import * as express from "express"
declare global {
    namespace Express {
        interface Request {
            pokemon : Record<string,any>
            trainer : Record<string,any>
        }
    }
}
