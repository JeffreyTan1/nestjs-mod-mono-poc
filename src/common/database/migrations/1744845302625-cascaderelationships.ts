import { MigrationInterface, QueryRunner } from 'typeorm';

export class Cascaderelationships1744845302625 implements MigrationInterface {
  name = 'Cascaderelationships1744845302625';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activity" DROP CONSTRAINT "FK_ae9efb83d44909ba3210d7d909e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" DROP CONSTRAINT "FK_2e493c174696a2eff8ec8655fca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" DROP CONSTRAINT "FK_3c18e4931800a156ce362769738"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "FK_648f10a00de595954969493d2b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "version" DROP CONSTRAINT "FK_b5502a1e6b2306d1f41d9bed2b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "REL_648f10a00de595954969493d2b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" DROP COLUMN "currentVersionId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "FK_ae9efb83d44909ba3210d7d909e" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "FK_2e493c174696a2eff8ec8655fca" FOREIGN KEY ("fromVersionId") REFERENCES "version"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "FK_3c18e4931800a156ce362769738" FOREIGN KEY ("toVersionId") REFERENCES "version"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "version" ADD CONSTRAINT "FK_b5502a1e6b2306d1f41d9bed2b3" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "version" DROP CONSTRAINT "FK_b5502a1e6b2306d1f41d9bed2b3"`,
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
    await queryRunner.query(`ALTER TABLE "file" ADD "currentVersionId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "REL_648f10a00de595954969493d2b" UNIQUE ("currentVersionId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "version" ADD CONSTRAINT "FK_b5502a1e6b2306d1f41d9bed2b3" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "FK_648f10a00de595954969493d2b5" FOREIGN KEY ("currentVersionId") REFERENCES "version"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "FK_3c18e4931800a156ce362769738" FOREIGN KEY ("toVersionId") REFERENCES "version"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "FK_2e493c174696a2eff8ec8655fca" FOREIGN KEY ("fromVersionId") REFERENCES "version"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "FK_ae9efb83d44909ba3210d7d909e" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
