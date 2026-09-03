import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { Report } from './reports.entity.ts/report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/users.entity.ts/user.entity';
import { ApporvedReportDto } from './dtos/Approved-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly repo: Repository<Report>,
  ) {}

  async create(body: CreateReportDto, user: User) {
    const report = this.repo.create(body);
    report.user = user;
    return await this.repo.save(report);
  }

  async toggleApproval(id : number , approved : boolean){
    const report = await this.repo.findOne({where: {id}});
    if(!report){
      throw new NotFoundException("Report not Found with this Id");
    }

    report.approved = approved;
    return await this.repo.save(report);
  }
}
