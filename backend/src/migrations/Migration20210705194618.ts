import { Migration } from '@mikro-orm/migrations';

export class Migration20210705194618 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "username" varchar(255) not null, "password" varchar(255) not null, "total_time_working" int4 not null, "paid_work_time" int4 not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');

    this.addSql('create table "work_event" ("id" serial primary key, "clock_in" timestamptz(0) not null, "clock_out" timestamptz(0) not null, "user_id" int4 not null);');

    this.addSql('alter table "work_event" add constraint "work_event_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

}
