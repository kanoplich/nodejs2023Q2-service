import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1691963661624 implements MigrationInterface {
  name = 'Migrations1691963661624';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" character varying, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favs_albums" ("id" SERIAL NOT NULL, "albumId" character varying NOT NULL, CONSTRAINT "PK_5c39a5385f76346ba8110e950dc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favs_artists" ("id" SERIAL NOT NULL, "artistId" character varying NOT NULL, CONSTRAINT "PK_da69aee12b19cbd801c8bf23e26" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favs_tracks" ("id" SERIAL NOT NULL, "trackId" character varying NOT NULL, CONSTRAINT "PK_82835fed634450c4b5b25c63aa4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" character varying, "albumId" character varying, "duration" integer NOT NULL, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "track"`);
    await queryRunner.query(`DROP TABLE "favs_tracks"`);
    await queryRunner.query(`DROP TABLE "favs_artists"`);
    await queryRunner.query(`DROP TABLE "favs_albums"`);
    await queryRunner.query(`DROP TABLE "artist"`);
    await queryRunner.query(`DROP TABLE "album"`);
  }
}
