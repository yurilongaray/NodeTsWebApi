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

	public getTheHighiestVmleDolar() {

		return Country.query(`
			SELECT c.name, vmle_dolar
			FROM country c
			JOIN ncm n on n.aquisition_country_id = c.id
			JOIN solicitation s on n.solicitation_id = s.id
			WHERE vmle_dolar IS NOT NULL
			ORDER BY vmle_dolar DESC
			LIMIT 10;
		`);
	}
}