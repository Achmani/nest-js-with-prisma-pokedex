import { Injectable } from "@nestjs/common";
import { MonsterRepository } from "../monsters/repository/monster.repository";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

@ValidatorConstraint({ async: true })
@Injectable()
export class MonsterExistRule implements ValidatorConstraintInterface {
    constructor(private repository: MonsterRepository) { }

    async validate(monsterName: string) {
        try {
            await this.repository.findOneOrFail(monsterName);
        } catch (e) {
            return false;
        }

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return "Monster " + args.value + " doesn't exist";
    }
}

export function MonsterExist(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'MonsterExist',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: MonsterExistRule,
        });
    };
}