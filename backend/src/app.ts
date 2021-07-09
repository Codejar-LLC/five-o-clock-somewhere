import "reflect-metadata";
import {MikroORM} from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {WorkEventResolver} from "./resolvers/workEventResolvers";
import {UserResolver} from "./resolvers/userResolver";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import {MyCtx} from "./types";
import cors from "cors";

const express = require('express');
const PORT: number = Number(process.env.PORT) || 4000;

const main = async () => {

    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    // Create instance of express object
    const app = express();

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }))

    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();

    // Important to put first because this middleware needs to run before apollo
    app.use(
        session({
            name: "cookie",
            store: new RedisStore({client: redisClient, disableTouch: true}),
            cookie: {maxAge: 1000 * 60 * 60 * 24 * 365 * 5, httpOnly: true, sameSite: 'lax'},
            saveUninitialized: false,
            secret: "needsToBeHidden",
            resave: false
        })
    );

    const apollo = new ApolloServer({
        schema: await buildSchema({
            resolvers: [WorkEventResolver, UserResolver],
            validate: false,
        }),
        context: ({req, res}): MyCtx =>
            ({em: orm.em, req, res})
    });

    apollo.applyMiddleware({
        app, cors: false
    });

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

main().catch((e) => {
    console.error(e);
});
