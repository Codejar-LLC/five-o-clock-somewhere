import {User} from "./entities/User";
import {WorkEvent} from "./entities/WorkEvent";
import {MikroORM} from "@mikro-orm/core";
import path from "path";

export default {
    migrations: {
        path: path.join(__dirname, './migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    entities: [User, WorkEvent],
    dbName: 'temp2',
    type: `postgresql`,
    user: 'postgres',
    password: 'Hayd3n!',
    host: 'localhost',
    port: 5432,
} as Parameters<typeof MikroORM.init>[0];
