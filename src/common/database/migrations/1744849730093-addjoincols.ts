import { MigrationInterface, QueryRunner } from "typeorm";

export class Addjoincols1744849730093 implements MigrationInterface {
    name = 'Addjoincols1744849730093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" ADD "currentVersionId" uuid`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "UQ_648f10a00de595954969493d2b5" UNIQUE ("currentVersionId")`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_648f10a00de595954969493d2b5" FOREIGN KEY ("currentVersionId") REFERENCES "version"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_648f10a00de595954969493d2b5"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "UQ_648f10a00de595954969493d2b5"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "currentVersionId"`);
    }

}
