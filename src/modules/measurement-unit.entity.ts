import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('measurement_unit')
export class MeasurementUnit extends BaseEntity {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ unique: true })
	public name: string;
}