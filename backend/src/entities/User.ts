import {Entity, OneToMany, PrimaryKey, Property} from "@mikro-orm/core";
import {WorkEvent} from "./WorkEvent";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
@Entity()
export class User {

    @Field()
    @PrimaryKey()
    id !: number;

    @Field()
    @Property()
    first_name !: string;

    @Field()
    @Property()
    last_name !: string;

    @Field()
    @Property({unique: true})
    username !: string;

    @Property()
    password !: string

    @Field()
    @Property()
    total_time_working !: number;

    @Field()
    @Property()
    paid_work_time !: number;

    @Field(() => [WorkEvent], {defaultValue: []})
    @OneToMany(() => WorkEvent, (workEvent) => workEvent.user)
    work_events !: WorkEvent[];

}
