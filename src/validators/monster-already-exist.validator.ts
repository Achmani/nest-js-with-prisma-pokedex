import { Injectable } from "@nestjs/common";
import { MonsterRepository } from "../monsters/repository/monster.repository";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

@ValidatorConstraint({ async: true })
@Injectable()
export class MonsterAlreadyExistRule implements ValidatorConstraintInterface {

    constructor(private repository: MonsterRepository) { }

    async validate(monsterName: string) {
        try {
            let monster = await this.repository.findOne(monsterName);
            console.log(monster);
            if (monster != null) {
                return false;
            }
        } catch (e) {
            return false;
        }
        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return "Monster " + args.value + " already exist";
    }
}

export function MonsterAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'MonsterAlreadyExist',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: MonsterAlreadyExistRule,
        });
    };
}