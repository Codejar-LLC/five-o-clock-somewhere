import {Ctx, Mutation, Query, Resolver} from "type-graphql";
import {WorkEvent} from "../entities/WorkEvent";
import {MyCtx} from "../types";

// GraphQL Resolver to request an array of workEvents. Connects Mikro-ORM & Type-GraphQL
@Resolver()
export class WorkEventResolver {

    @Query(() => [WorkEvent])
    workEvents(@Ctx() {em}: MyCtx): Promise<WorkEvent[]> {
        return em.find(WorkEvent, {});
    }

    @Mutation(() => WorkEvent)
    async createWorkEvent(@Ctx() {em}: MyCtx): Promise<WorkEvent> {
        const workEvent = em.create(WorkEvent, {});
        await em.persistAndFlush(workEvent);
        return workEvent;
    }
}