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

    @Query(() => User, {nullable: true})
    async me(@Ctx() {req, em}: MyCtx) {
        if (!req.session.userId) {
            return null;
        }
        return await em.findOne(User, {id: req.session.userId})
    }

    /**
     * Method to find specific user based on id.
     * Query means that something is being looked for in DB
     * Arg is a param, Ctx is the context (mikro-ORM is being used in context to edit DB)
     *
     * @param id Id number of user being searched for
     * @param em Context
     * @returns Response The user that is being searched for or an error if it is not found
     */
    @Query(() => Response, )
    async findUser(@Arg("id", () => Int) id: number, @Ctx() {em}: MyCtx): Promise<Response> {
        const user = await em.findOne(User, {id});
        if (user) {
            return { user }
        } else {
            return {
                errors : [
                    {
                        field: "Users",
                        message: "A user with this ID cannot be found."
                    },
                ],
            }
        }
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
     * @param email User's email
     * @param password User's password
     * @param total_time_working Time worked overall in minutes. Defaults to 0
     * @param paid_work_time Time worked in minutes that has been paid for. Defaults to 0.
     * @param work_events Array of work events that defaults to empty
     * @param em Context
     * @param req Request from context
     * @returns User that is created
     */
    @Mutation(() => Response, {nullable : true})
    async createUser(@Arg("first_name") first_name : string,
                     @Arg("last_name") last_name : string,
                     @Arg("email") email : string,
                     @Arg("password") password : string,
                     @Arg("total_time_working", {defaultValue : 0}) total_time_working : number,
                     @Arg("paid_work_time", {defaultValue : 0}) paid_work_time : number,
                     @Arg("work_events", () => [WorkEventInput], {defaultValue : []}) work_events : WorkEvent[],
                     @Ctx() {em, req}: MyCtx): Promise<Response | null> {
        try {
            if (!(email.includes("@") && email.includes("."))) {
                return {
                    errors: [
                        {
                            field: "email",
                            message: "Invalid email"
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
                first_name, last_name, email, total_time_working, password: hashedPass, paid_work_time, work_events
            });
            await em.persistAndFlush(user);
            req.session.userId = user.id;
            return { user};
        } catch (e) {
            if (e.code === "23505") {
                return {
                    errors : [
                        {
                            field: "email",
                            message: "Account with this email already exists."
                        },
                    ],
                }
            }
            return {
                errors : [
                    {
                        field: "Uncaught error",
                        message: e.error()
                    },
                ],
            }
        }
    }

    /**
     * Login for user
     *
     * @param email Email of user
     * @param password Password of User
     * @param em Context
     * @returns boolean True if successful login, otherwise false
     */
    @Mutation(() => Response)
    async login(
        @Arg("email") email : string,
        @Arg("password") password : string,
        @Ctx() {em, req}: MyCtx): Promise<Response> {
            const user = await em.findOne(User, {email});
            if (!user) {
                return {
                    errors: [
                        {
                            field: "email",
                            message: "The email is not correct"
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
            req.session.userId = user.id;
            return { user };
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
        const user = await em.findOne(User, {id});
        if (user) {
            await em.nativeDelete(User, {id});
            return true;
        } else {
            return false;
        }
    }
}
