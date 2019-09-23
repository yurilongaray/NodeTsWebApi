import { Controller, Get } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { CountryRepository } from './country.repository';
import { FileService } from 'src/utils/file.service';

@Controller('v1/country')
export class CountryController {

	@Get()
	public async getTheHighiestVmleDolar() {

		return getCustomRepository(CountryRepository).getTheHighiestVmleDolar();
	}

	@Get('pdf')
	public async getTheHighiestVmleDolarPdf() {

		const data = await getCustomRepository(CountryRepository).getTheHighiestVmleDolar();

		return FileService.pdfGenerate(data);
	}
}