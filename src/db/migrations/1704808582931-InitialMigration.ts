import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1704808582931 implements MigrationInterface {
  name = 'InitialMigration1704808582931';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`verified\` tinyint NOT NULL DEFAULT 0, \`profile_completed\` tinyint NOT NULL DEFAULT 0, \`address\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`zipcode\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`birthday\` varchar(255) NOT NULL, \`email_verified\` tinyint NOT NULL DEFAULT 0, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'customer', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
