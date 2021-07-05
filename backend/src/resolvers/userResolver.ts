import {Arg, Ctx, Field, InputType, Int, Mutation, ObjectType, Query, Resolver} from "type-graphql";
import {MyCtx} from "../types";
import {User} from "../entities/User";
import {WorkEvent} from "../entities/WorkEvent";
import argon2 from "argon2";

@InputType()
class WorkEventInput implements Partial<WorkEvent> {
    @Field({nullable : true})
    clock_in : Date;
    @Field({nullable : true})
    clock_out : Date;
}

@ObjectType()
class FieldError {
    @Field()
    field: string

    @Field()
    message: string
}

@ObjectType()
class Response {

    @Field(() => [FieldError], {nullable: true})
    errors ?: FieldError[]

    @Field(() => User, {nullable : true})
    user ?: User;
}

@Resolver()
export class UserResolver {

    /**
     * Method to find specific user based on id.
     * Query means that something is being looked for in DB
     * Arg is a param, Ctx is the context (mikro-ORM is being used in context to edit DB)
     *
     * @param id Id number of user being searched for
     * @param em Context
     * @returns User The user that is being searched for or null if it is not found
     */
    @Query(() => User, {nullable : true})
    findUser(@Arg("id", () => Int) id: number, @Ctx() {em}: MyCtx): Promise<User | null> {
        return em.findOne(User, {id});
    }

    /**
     * Returns list of all users.
     *
     * @param em Context
     * @returns User[] An array of all users in the DB
     */
    @Query(() => [User], {nullable: true})
    users(@Ctx() {em}: MyCtx) : Promise<User[] | null> {
        return em.find(User, {});
    }

    /**
     * Method to create a new user in Type GraphQL
     *
     * @param first_name User's first name
     * @param last_name User's last name
     * @param username User's username
     * @param password User's password
     * @param total_time_working Time worked overall in minutes. Defaults to 0
     * @param paid_work_time Time worked in minutes that has been paid for. Defaults to 0.
     * @param work_events Array of work events that defaults to empty
     * @param em Context
     * @returns User that is created
     */
    @Mutation(() => Response, {nullable : true})
    async createUser(@Arg("first_name") first_name : string,
                     @Arg("last_name") last_name : string,
                     @Arg("username") username : string,
                     @Arg("password") password : string,
                     @Arg("total_time_working", {defaultValue : 0}) total_time_working : number,
                     @Arg("paid_work_time", {defaultValue : 0}) paid_work_time : number,
                     @Arg("work_events", () => [WorkEventInput], {defaultValue : []}) work_events : WorkEvent[],
                     @Ctx() {em}: MyCtx): Promise<Response | null> {
        try {
            if (username.length <= 3) {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "Length of username must be longer than 3 characters"
                        },
                    ],
                }
            } else if (password.length <= 3) {
                return {
                    errors: [
                        {
                            field: "password",
                            message: "Length of the password must be longer than 3 characters"
                        },
                    ],
                }
            } else if (first_name.length === 0) {
                return {
                    errors: [
                        {
                            field: "first name",
                            message: "You must input your first name"
                        },
                    ],
                }
            } else if (last_name.length === 0) {
                return {
                    errors: [
                        {
                            field: "last name",
                            message: "You must input your last name"
                        },
                    ],
                }
            }
            const hashedPass = await argon2.hash(password);
            const user = em.create(User, {
                first_name, last_name, username, total_time_working, password: hashedPass, paid_work_time, work_events
            });
            await em.persistAndFlush(user);
            return {
                user
            };
        } catch {
            return {
                errors : [
                    {
                        field: "username",
                        message: "Account with this username already exists."
                    },
                ],
            }
        }
    }

    /**
     * Login for user
     *
     * @param username Username of user
     * @param password Password of User
     * @param em Context
     * @returns boolean True if successful login, otherwise false
     */
    @Mutation(() => Response)
    async login(
        @Arg("username") username : string,
        @Arg("password") password : string,
        @Ctx() {em}: MyCtx): Promise<Response> {
            const user = await em.findOne(User, {username});
            if (!user) {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "The username is not correct"
                        },
                    ],
                }
            } else if (!(await argon2.verify(user.password, password))) {
                return {
                    errors: [
                        {
                            field: "password",
                            message: "Your password is incorrect"
                        },
                    ],
                }
            }
            return {
                user,
            };
    }

    /**
     * A method to delete a previously created user.
     *
     * @param id ID of the user being deleted
     * @param em The context
     * @returns boolean true if successfully deleted, false if not
     */
    @Mutation(() => Boolean)
    async deleteUser(@Arg("id") id : number, @Ctx() {em}: MyCtx): Promise<boolean> {
        try {
            await em.nativeDelete(User, {id})
        } catch {
            return false;
        }
        return true;
    }
}
