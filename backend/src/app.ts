import "reflect-metadata";
import {MikroORM} from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import {WorkEventResolver} from "./resolvers/workEventResolvers";
import {UserResolver} from "./resolvers/userResolver";

const express = require('express');
const PORT : number = Number(process.env.PORT) || 3000;

const main = async () => {

    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    // Create instance of express object
    const app = express();
    const apollo = new ApolloServer({
        schema: await buildSchema({
            resolvers: [WorkEventResolver, UserResolver],
            validate: false,
        }),
        context: () => ({ em : orm.em })
    });

    apollo.applyMiddleware({ app });

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

main().catch((e) => {
    console.error(e);
});
