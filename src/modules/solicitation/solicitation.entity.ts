import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('solicitation')
export class Solicitation extends BaseEntity {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public archive_id: number;

	@Column({ unique: true })
	public order_number: number;

	@Column()
	public aname: number;

	@Column('numeric')
	public vmle_dolar?: number;

	@Column('numeric')
	public vl_freight?: number;

	@Column('numeric')
	public vl_secure?: number;

	@Column('numeric')
	public total_product_unit?: number;

	@Column()
	public incoterm?: string;

	@Column()
	public nat_information?: string;

	@Column()
	public dispatch_situation?: string;

	@Column()
	public competence_date: Date;

	@Column()
	public product_id: number;

	@Column()
	public origin_country_id?: number;

	@Column()
	public aquisition_country_id?: number;

	@Column()
	public landing_place_id?: number;
}