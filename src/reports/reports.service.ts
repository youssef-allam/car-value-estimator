import { Injectable, UseGuards } from '@nestjs/common';
import { Report } from './reports.entity.ts/report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly repo: Repository<Report>,
  ) {}

  async create(body: CreateReportDto) {
    const entity = this.repo.create(body);
    return await this.repo.save(entity);
  }
}
