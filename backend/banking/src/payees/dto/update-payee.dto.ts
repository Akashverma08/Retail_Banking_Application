import {PartialType} from "@nestjs/mapped-types";
import {CreatePayeeDTO} from "./create-payee.dto.js"

export class UpdatePayeeDTO extends PartialType(CreatePayeeDTO){}