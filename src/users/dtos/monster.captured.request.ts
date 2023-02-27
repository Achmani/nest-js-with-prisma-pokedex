import { MonsterExist } from "../../validators/monster-exist.validator";
import { ArrayNotEmpty, IsArray, IsString, MaxLength } from "class-validator";

export class MonsterCapturedRequest {

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    @MaxLength(191, { each: true })
    @MonsterExist({ each: true })
    monster_name: string[];

}