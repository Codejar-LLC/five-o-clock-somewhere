import {Connection, EntityManager, IDatabaseDriver} from "@mikro-orm/core";

// User defined context that is accessed in Resolvers
export type MyCtx = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
}
