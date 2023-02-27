-- CreateTable
CREATE TABLE `Monster` (
    `monsterId` VARCHAR(191) NOT NULL,
    `monsterName` VARCHAR(191) NOT NULL,
    `monsterDeleted` BOOLEAN NOT NULL DEFAULT false,
    `monsterCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `monsterUpdated` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Monster_monsterName_key`(`monsterName`),
    PRIMARY KEY (`monsterId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MonsterType` (
    `monsterTypeId` VARCHAR(191) NOT NULL,
    `monsterTypeName` VARCHAR(191) NOT NULL,
    `monsterTypeDeleted` BOOLEAN NOT NULL DEFAULT false,
    `monsterTypeCreated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `monsterTypeUpdated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MonsterType_monsterTypeName_key`(`monsterTypeName`),
    PRIMARY KEY (`monsterTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MonsterHasType` (
    `monsterId` VARCHAR(191) NOT NULL,
    `monsterTypeId` VARCHAR(191) NOT NULL,
    `monsterTypeCreated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `monsterTypeUpdated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`monsterId`, `monsterTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MonsterHasType` ADD CONSTRAINT `MonsterHasType_monsterId_fkey` FOREIGN KEY (`monsterId`) REFERENCES `Monster`(`monsterId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MonsterHasType` ADD CONSTRAINT `MonsterHasType_monsterTypeId_fkey` FOREIGN KEY (`monsterTypeId`) REFERENCES `MonsterType`(`monsterTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE;
