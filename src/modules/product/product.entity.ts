import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('product')
export class Product extends BaseEntity {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ unique: true })
	public description: string;

	@Column()
	public measurement_unit_id?: number;

	@Column()
	public commercial_measurement_id?: number;

	@Column('numeric')
	public net_weight?: number;

	@Column('numeric')
	public unit_value?: number;
}