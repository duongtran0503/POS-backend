import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { TableStatusEnum } from 'src/enums/table.status.enum';

@ValidatorConstraint({ name: 'CheckStatusTable', async: false })
export class ValidateStatusTable implements ValidatorConstraintInterface {
  validate(value: string): Promise<boolean> | boolean {
    if (Object.values(TableStatusEnum).includes(value as TableStatusEnum))
      return true;
    return false;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    throw new Error(validationArguments?.property + 'Không hợp lệ!');
  }
}
