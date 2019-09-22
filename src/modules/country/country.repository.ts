import { Country } from './country.entity';
import { EntityRepository, getRepository } from 'typeorm';

@EntityRepository(Country)
export class CountryRepository {

	public async saveCountryIfNotExists(name: string) {

		const countryFound = await Country.findOne({ name });

		if (!countryFound) {

			return getRepository(Country).save({ name }).then(country => country.id);
		}

		return countryFound.id;
	}
}