import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('solicitation')
export class Solicitation extends BaseEntity {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public product_id: number;

	@Column('numeric')
	public vmle_dolar?: number;

	@Column('numeric')
	public vl_freight?: number;

	@Column('numeric')
	public vl_secure?: number;

	@Column('numeric')
	public commercial_quantity?: number;

	@Column('numeric')
	public total_product_unit?: number;
}