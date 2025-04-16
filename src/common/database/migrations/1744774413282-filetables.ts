import { MigrationInterface, QueryRunner } from 'typeorm';

export class Filetables1744774413282 implements MigrationInterface {
  name = 'Filetables1744774413282';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "activity" ("id" uuid NOT NULL, "operation" character varying NOT NULL, "userId" uuid NOT NULL, "timestamp" TIMESTAMP NOT NULL, "reason" character varying, "fileId" uuid, "fromVersionId" uuid, "toVersionId" uuid, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "name" character varying NOT NULL, "fileType" character varying NOT NULL, "softDeleted" boolean NOT NULL DEFAULT false, "currentVersionId" uuid, CONSTRAINT "REL_648f10a00de595954969493d2b" UNIQUE ("currentVersionId"), CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "version" ("id" uuid NOT NULL, "versionNumber" integer NOT NULL, "mimeType" character varying NOT NULL, "storageStrategy" character varying NOT NULL, "storageIdentifier" character varying NOT NULL, "metadata" jsonb, "fileId" uuid, CONSTRAINT "PK_4fb5fbb15a43da9f35493107b1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "FK_ae9efb83d44909ba3210d7d909e" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "FK_2e493c174696a2eff8ec8655fca" FOREIGN KEY ("fromVersionId") REFERENCES "version"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "FK_3c18e4931800a156ce362769738" FOREIGN KEY ("toVersionId") REFERENCES "version"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "FK_648f10a00de595954969493d2b5" FOREIGN KEY ("currentVersionId") REFERENCES "version"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "version" ADD CONSTRAINT "FK_b5502a1e6b2306d1f41d9bed2b3" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "version" DROP CONSTRAINT "FK_b5502a1e6b2306d1f41d9bed2b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "FK_648f10a00de595954969493d2b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" DROP CONSTRAINT "FK_3c18e4931800a156ce362769738"`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" DROP CONSTRAINT "FK_2e493c174696a2eff8ec8655fca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" DROP CONSTRAINT "FK_ae9efb83d44909ba3210d7d909e"`,
    );
    await queryRunner.query(`DROP TABLE "version"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "activity"`);
  }
}
