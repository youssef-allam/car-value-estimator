import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    price: number;
    
    @Column()
    make: string;
    
    @Column()
    model: string;
    
    @Column()
    year: number;
    
    @Column()
    mileage: number;
    // lng: number;
    // lat: number;
    
    @Column()
    approved: boolean;
    // user: User;
}