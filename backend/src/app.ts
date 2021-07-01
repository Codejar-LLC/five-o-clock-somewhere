import {MikroORM} from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import {HelloResolver} from "./resolvers/hello";

const express = require('express');
const PORT : number = Number(process.env.PORT) || 3000;

const main = async () => {

    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();

    // Create instance of express object
    const app = express();

    const apollo = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: false,
        }),
    });

    apollo.applyMiddleware({ app });

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

main().catch((e) => {
    console.error(e);
});
