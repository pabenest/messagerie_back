import { type ArgumentMetadata, BadRequestException, type PipeTransform } from "@nestjs/common";
import { type ZodError, type ZodType } from "zod";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  public transform(value: unknown, _metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value);
    } catch (e: unknown) {
      throw new BadRequestException(`Validation failed (${(e as ZodError).message})`);
    }
    return value;
  }
}
