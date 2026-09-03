import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Report } from 'src/reports/reports.entity.ts/report.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;


  @Column({ default: true})
  isAdmin: boolean;

  @OneToMany(()=> Report, (report) => report.user)
  reports: Report[];
}
