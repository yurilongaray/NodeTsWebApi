import { Controller, Get } from '@nestjs/common';
import { CsvService } from './csv.service';

@Controller('v1/csv')
export class CsvController {

	constructor(private readonly csvService: CsvService) {}

	@Get()
	public async getAll() {

		return this.csvService.importCsv('CAPI011905.CSV');
	}
}