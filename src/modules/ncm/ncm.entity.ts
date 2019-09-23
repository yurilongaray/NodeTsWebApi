import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('ncm')
export class Ncm extends BaseEntity {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ unique: true })
	public code: number;

	@Column()
	public description?: string;

	@Column('numeric')
	public statistical_unit?: number;
}