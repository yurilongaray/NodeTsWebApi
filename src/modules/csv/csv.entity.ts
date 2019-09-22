import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('archive')
export class Csv {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ unique: true })
	public name: string;

	@Column()
	public data: Date;

	@Column()
	public received_data: JSON;
}