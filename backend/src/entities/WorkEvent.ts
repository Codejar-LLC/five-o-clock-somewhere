import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {User} from "./User";

@Entity()
export class WorkEvent {

    @PrimaryKey()
    id !: number;

    @Property({type: 'date'})
    clock_in = new Date();

    @Property({type: 'date'})
    clock_out = new Date();

    @ManyToOne(() => User)
    user !: User;

}
