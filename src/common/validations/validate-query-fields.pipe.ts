import { Prisma } from '@prisma/client';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { StatsQueryDoubleDto, StatsQueryOneDto } from '@statistics/dto';

Injectable();
export class ValidateQueryFields implements PipeTransform {
  transform(queryParams: StatsQueryDoubleDto | StatsQueryOneDto) {
    let isValidFields: boolean = true;

    if (queryParams instanceof StatsQueryOneDto) {
      isValidFields = Prisma.StatsScalarFieldEnum.hasOwnProperty(queryParams.field);
    }

    if (queryParams instanceof StatsQueryDoubleDto) {
      const { mainField, secondField } = queryParams;

      isValidFields =
        Prisma.StatsScalarFieldEnum.hasOwnProperty(mainField) &&
        Prisma.StatsScalarFieldEnum.hasOwnProperty(secondField);
    }

    if (!isValidFields) {
      throw new BadRequestException();
    }

    return queryParams;
  }
}
