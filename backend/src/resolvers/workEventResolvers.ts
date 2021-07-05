import {Ctx, Mutation, Query, Resolver} from "type-graphql";
import {WorkEvent} from "../entities/WorkEvent";
import {MyCtx} from "../types";

// GraphQL Resolver to request an array of workEvents. Connects Mikro-ORM & Type-GraphQL
@Resolver()
export class WorkEventResolver {

    /**
     * Method to return an array of work events in the DB.
     *
     * @param em The context
     * @returns WorkEvent[] Array of all work events
     */
    @Query(() => [WorkEvent])
    workEvents(@Ctx() {em}: MyCtx): Promise<WorkEvent[]> {
        return em.find(WorkEvent, {});
    }

    /**
     * Method to create a new work event
     *
     * @param em The context
     * @returns workEvent newly created work event
     */
    @Mutation(() => WorkEvent)
    async createWorkEvent(@Ctx() {em}: MyCtx): Promise<WorkEvent> {
        const workEvent = em.create(WorkEvent, {});
        await em.persistAndFlush(workEvent);
        return workEvent;
    }
}
