import { Injectable, UseGuards } from '@nestjs/common';
import { Report } from './reports.entity.ts/report.entity';
import { AuthGuard } from 'src/guards/auth.guard';
@Injectable()
export class ReportsService {

    @UseGuards(AuthGuard)
    create(body : Partial<Report>){
    
    }
}
