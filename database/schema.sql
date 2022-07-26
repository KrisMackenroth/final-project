 set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."workouts" (
	"workoutId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"muscleGroup" TEXT NOT NULL,
	"userId" integer NOT NULL,
	"dateCreated" timestamptz NOT NULL default now(),
	CONSTRAINT "workouts_pk" PRIMARY KEY ("workoutId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."combined" (
	"workoutId" integer NOT NULL,
	"exerciseId" integer NOT NULL,
	CONSTRAINT "combined_pk" PRIMARY KEY ("workoutId","exerciseId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."exercises" (
	"exerciseId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"muscleGroup" TEXT NOT NULL,
	CONSTRAINT "exercises_pk" PRIMARY KEY ("exerciseId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."accountInfo" (
  "accountInfoId" serial NOT NULL,
	"userId" integer NOT NULL,
	"weight" integer NOT NULL,
	"height" integer NOT NULL,
	"birthday" date NOT NULL,
	"sex" TEXT NOT NULL,
  CONSTRAINT "accountInfo_pk" PRIMARY KEY ("accountInfoId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "workouts" ADD CONSTRAINT "workouts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "combined" ADD CONSTRAINT "combined_fk0" FOREIGN KEY ("workoutId") REFERENCES "workouts"("workoutId");
ALTER TABLE "combined" ADD CONSTRAINT "combined_fk1" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("exerciseId");
ALTER TABLE "accountInfo" ADD CONSTRAINT "accountInfo_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
