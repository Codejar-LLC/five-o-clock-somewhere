import {Entity, OneToMany, PrimaryKey, Property} from "@mikro-orm/core";
import {WorkEvent} from "./WorkEvent";
import {Field} from "type-graphql";

@Entity()
export class User {

    @Field()
    @PrimaryKey()
    id !: number;

    @Property()
    first_name !: string;

    @Property()
    last_name !: string;

    @Property()
    username !: string;

    @Property()
    password !: string

    @Property()
    total_time_word !: number;

    @Property()
    paid_work_time !: number;

    @OneToMany(() => WorkEvent, (workEvent) => workEvent.user)
    work_events !: WorkEvent[];

}
