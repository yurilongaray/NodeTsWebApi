import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('ncm')
export class Ncm extends BaseEntity {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public archive_id: number;

	@Column()
	public ncm_number: number;

	@Column()
	public aname?: string;

	@Column()
	public code?: number;

	@Column()
	public code_description?: string;

	@Column()
	public origin_country_id?: number;

	@Column()
	public aquisition_country_id?: number;

	@Column()
	public solicitation_id?: number;

	@Column('numeric')
	public statistical_unit?: number;

	@Column('numeric')
	public statistical_quantity?: number;

	@Column()
	public landing_place_id?: number;

	@Column()
	public incoterm?: string;

	@Column()
	public nat_information?: string;

	@Column()
	public dispatch_situation?: string;
}