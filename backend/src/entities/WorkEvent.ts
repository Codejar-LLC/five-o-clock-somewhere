import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {User} from "./User";

@Entity()
export class WorkEvent {

    @PrimaryKey()
    id !: number;

    @Property()
    clockIn = new Date();

    @Property()
    clockOut = new Date();

    @ManyToOne(() => User)
    user!: User;

}
