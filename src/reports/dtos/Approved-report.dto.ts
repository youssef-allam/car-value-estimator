import { IsBoolean } from "class-validator";


export class ApporvedReportDto{
    @IsBoolean()
    approved : boolean;
}