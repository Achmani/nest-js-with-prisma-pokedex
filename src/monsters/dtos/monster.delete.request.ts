import { IsNotEmpty, IsString } from "class-validator";
import { MonsterExist } from "../../validators/monster-exist.validator";

export class MonsterDeleteRequest {

    @IsString()
    @IsNotEmpty()
    @MonsterExist()
    monster_name: string;

}