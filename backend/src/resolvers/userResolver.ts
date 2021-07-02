import {Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver} from "type-graphql";
import {MyCtx} from "../types";
import {User} from "../entities/User";
import {WorkEvent} from "../entities/WorkEvent";

@InputType()
class WorkEventInput implements Partial<WorkEvent> {
    @Field({nullable : true})
    clock_in : Date;
    @Field({nullable : true})
    clock_out : Date;
}

@Resolver()
export class UserResolver {
    // Shows that this can be queried and that this query returns a user, { nullable : true } shows that null can be
    // returned if the user is not found.
    @Query(() => User, {nullable : true})
    // Method findUser that takes in ID to return user info. Can be queried by using findUser(id: x) { first_name, ... }
    // @Arg represents the parameters used in GraphQL, "id" can be changed to any word. Can have many @Arg
    // Typescript means that the context will return a promise that has to match the method, so by putting |, it
    // shows that the Promise could return either a User or null
    findUser(@Arg("id", () => Int) id: number, @Ctx() {em}: MyCtx): Promise<User | null> {
        return em.findOne(User, {id});
    }

    // @Mutation is used for creating and updating data in the db.
    @Mutation(() => User)
    // Can call in GraphQL playground using mutation { createUser(....) }
    // The argument here is the class UserInput, which is a @InputType class defined above
    // @Ctx represents the context of the argument, and is how you connect Mikro-ORM, which allows you to edit db
    async createUser(@Arg("first_name") first_name : string,
                     @Arg("last_name") last_name : string,
                     @Arg("username") username : string,
                     @Arg("password") password : string,
                     @Arg("total_time_working", {defaultValue : 0}) total_time_working : number,
                     @Arg("total_time_paid", {defaultValue : 0}) total_time_paid : number,
                     @Arg("work_events", () => [WorkEventInput], {defaultValue : []}) work_events : WorkEvent[],
                     @Ctx() {em}: MyCtx): Promise<User> {
        const user = em.create(User, {first_name, last_name, username, password,
            total_time_working, total_time_paid, work_events});
        await em.persistAndFlush(user);
        return user;
    }
}
