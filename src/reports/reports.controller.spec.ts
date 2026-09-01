import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './reports.entity.ts/report.entity';

describe('ReportsController', () => {
  let controller: ReportsController;
  let fakeReportsService: Partial<ReportsService>;

  beforeEach(async () => {
    fakeReportsService = {
      create(body: CreateReportDto) {
        return Promise.resolve(body as Report);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [
        {
          provide: ReportsService,
          useValue: fakeReportsService,
        },
      ],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


});
