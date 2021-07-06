import {Connection, EntityManager, IDatabaseDriver} from "@mikro-orm/core";
import {Request, Response} from "express";

// User defined context that is accessed in Resolvers
export type MyCtx = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
    req: Request & { // @ts-ignore
        session : Express.Session };
    res: Response;
};
