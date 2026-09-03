import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { Report } from './reports.entity.ts/report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/users.entity.ts/user.entity';
import { ApporvedReportDto } from './dtos/Approved-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

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

  async toggleApproval(id: number, approved: boolean) {
    const report = await this.repo.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('Report not Found with this Id');
    }

    report.approved = approved;
    return await this.repo.save(report);
  }

  createEstimate({make , model , lng , lat , year , mileage}: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('avg(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne().catch(err => console.error(err));
  }
}
