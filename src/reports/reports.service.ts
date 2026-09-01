import { Injectable, UseGuards } from '@nestjs/common';
import { Report } from './reports.entity.ts/report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/users.entity.ts/user.entity';

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
}
