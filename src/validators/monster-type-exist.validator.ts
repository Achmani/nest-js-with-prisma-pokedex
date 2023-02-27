import { Injectable } from "@nestjs/common";
import { MonsterTypeRepository } from "../monsters/repository/monster-type.repository";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

@ValidatorConstraint({ async: true })
@Injectable()
export class MonsterTypeExistRule implements ValidatorConstraintInterface {
    constructor(private repository: MonsterTypeRepository) { }

    async validate(monsterTypeNames: string) {
        try {
            console.log("MonsterTypeExistRule");
            console.log(monsterTypeNames);
            await this.repository.findOneOrFail(monsterTypeNames);
        } catch (e) {
            return false;
        }

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return "Monster Type " + args.value + " doesn't exist";
    }
}

export function MonsterTypeExist(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'MonsterTypeExist',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: MonsterTypeExistRule,
        });
    };
}