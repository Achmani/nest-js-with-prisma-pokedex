/*
  Warnings:

  - You are about to drop the `monsterhastype` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `monsterhastype` DROP FOREIGN KEY `MonsterHasType_monsterId_fkey`;

-- DropForeignKey
ALTER TABLE `monsterhastype` DROP FOREIGN KEY `MonsterHasType_monsterTypeId_fkey`;

-- DropTable
DROP TABLE `monsterhastype`;

-- CreateTable
CREATE TABLE `_MonsterToMonsterType` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_MonsterToMonsterType_AB_unique`(`A`, `B`),
    INDEX `_MonsterToMonsterType_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_MonsterToMonsterType` ADD CONSTRAINT `_MonsterToMonsterType_A_fkey` FOREIGN KEY (`A`) REFERENCES `Monster`(`monsterId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MonsterToMonsterType` ADD CONSTRAINT `_MonsterToMonsterType_B_fkey` FOREIGN KEY (`B`) REFERENCES `MonsterType`(`monsterTypeId`) ON DELETE CASCADE ON UPDATE CASCADE;
