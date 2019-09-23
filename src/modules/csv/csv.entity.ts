import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('archive')
export class Csv extends BaseEntity {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public chapter_code?: string;

	@Column()
	public upload_date: Date;

	@Column('simple-json')
	public received_data: {};
}