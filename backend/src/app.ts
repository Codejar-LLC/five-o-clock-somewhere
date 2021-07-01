import {MikroORM} from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
const express = require('express');

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    console.log(orm.em);
    // Create instance of express object
    const app = express();
    app.listen(3000, () => {
        `Listening on port 3000...`
    });
}

main().catch((e) => {
    console.error(e);
});
