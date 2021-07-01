import {MikroORM} from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
const express = require('express');

const PORT : number = Number(process.env.PORT) || 3000;

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    console.log(orm.em);
    // Create instance of express object
    const app = express();
    app.listen(PORT, () => {
        `Listening on port 3000...`
    });
}

main().catch((e) => {
    console.error(e);
});
