import { Controller, Get } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { CountryRepository } from './country.repository';

@Controller('v1/country')
export class CountryController {

	@Get()
	public async getAllAndOrderByVmleDolar() {

		return getCustomRepository(CountryRepository).getTheHighiestVmleDolar();
	}
}