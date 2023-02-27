import { MonsterExist } from "../../validators/monster-exist.validator";
import { MonsterTypeExist } from "../../validators/monster-type-exist.validator";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class MonsterUpdateRequest {

    @IsString()
    @IsNotEmpty()
    @MonsterExist()
    monster_name: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    @MaxLength(191, { each: true })
    @MonsterTypeExist({ each: true })
    monster_type: string[];
}