import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('landing_place')
export class LandingPlace extends BaseEntity {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ unique: true })
	public name: string;

	@Column()
	public resourcefulness_unit?: string;
}