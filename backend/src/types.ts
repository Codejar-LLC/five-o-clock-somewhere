import {Connection, EntityManager, IDatabaseDriver} from "@mikro-orm/core";
import {Request, Response} from "express";
import {Session, SessionData} from "express-session";

// User defined context that is accessed in Resolvers
export type MyCtx = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
    req: Request & {
        session : Session & Partial<SessionData> & { userId ?: number }};
    res: Response;
};
