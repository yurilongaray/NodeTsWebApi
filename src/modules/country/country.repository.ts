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
			SELECT c.name, SUM(s.vmle_dolar)
			FROM country c
			JOIN solicitation s ON s.aquisition_country_id = c.id
			WHERE vmle_dolar IS NOT NULL
			GROUP BY c.name
			ORDER BY SUM(s.vmle_dolar) DESC;
		`);
	}
}