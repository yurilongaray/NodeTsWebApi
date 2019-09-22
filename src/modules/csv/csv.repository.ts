import { EntityRepository } from 'typeorm';
import { Csv } from './csv.entity';

@EntityRepository(Csv)
export class CsvRepository {

	public getAll() {

		return Csv.findAndCount();
	}
}