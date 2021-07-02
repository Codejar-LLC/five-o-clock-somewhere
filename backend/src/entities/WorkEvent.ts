import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {User} from "./User";
import {Field, Int, ObjectType} from "type-graphql";

@ObjectType()
@Entity()
export class WorkEvent {

    @Field(() => Int)
    @PrimaryKey()
    id !: number;

    @Field(() => String)
    @Property({type: 'date'})
    clock_in = new Date();

    @Field(() => String)
    @Property({type: 'date'})
    clock_out = new Date();

    @Field(() => User)
    @ManyToOne(() => User)
    user !: User;

}
