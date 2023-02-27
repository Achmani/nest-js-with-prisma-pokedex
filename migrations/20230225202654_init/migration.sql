-- CreateTable
CREATE TABLE `User` (
    `userId` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `userFirstName` VARCHAR(191) NOT NULL,
    `userLastName` VARCHAR(191) NOT NULL,
    `userDeleted` BOOLEAN NOT NULL DEFAULT false,
    `userCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userUpdated` DATETIME(3) NOT NULL,
    `userTypeUserTypeId` VARCHAR(191) NOT NULL,
    `monsterMonsterId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_userName_key`(`userName`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserType` (
    `userTypeId` VARCHAR(191) NOT NULL,
    `userTypeName` VARCHAR(191) NOT NULL,
    `userTypeDeleted` BOOLEAN NOT NULL DEFAULT false,
    `userTypeCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userTypeUpdated` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserType_userTypeName_key`(`userTypeName`),
    PRIMARY KEY (`userTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MonsterToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_MonsterToUser_AB_unique`(`A`, `B`),
    INDEX `_MonsterToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userTypeUserTypeId_fkey` FOREIGN KEY (`userTypeUserTypeId`) REFERENCES `UserType`(`userTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MonsterToUser` ADD CONSTRAINT `_MonsterToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Monster`(`monsterId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MonsterToUser` ADD CONSTRAINT `_MonsterToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
