import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
// import {WorkEvent} from "./WorkEvent";

@Entity()
export class User {

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

    // @OneToMany(() => WorkEvent)
    // workEvent !: WorkEvent;
}
