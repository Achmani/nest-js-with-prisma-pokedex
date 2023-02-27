import { MonsterTypeExist } from "../../validators/monster-type-exist.validator";
import { MonsterAlreadyExist } from "../../validators/monster-already-exist.validator";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, MaxLength, Validate } from "class-validator";

export class MonsterCreateRequest {

    @IsString()
    @IsNotEmpty()
    @MonsterAlreadyExist()
    monster_name: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    @MaxLength(191, { each: true })
    @MonsterTypeExist({each: true})
    monster_type: string[];
}