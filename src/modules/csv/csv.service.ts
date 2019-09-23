import { Injectable } from '@nestjs/common';
import { FileService } from 'src/utils/file.service';
import { getCustomRepository, getRepository } from 'typeorm';
import { CsvColumnIdentifier } from './csv.enum';
import { CountryRepository } from '../country/country.repository';
import { ProductRepository } from '../product/product.repository';
import { MeasurementUnitRepository } from '../measurement-unit.repository.ts/measurement-unit.repository';
import { LandingPlaceRepository } from '../landing-place/landing-place.repository';
import { NcmRepository } from '../ncm/ncm.repository';
import { SolicitationRepository } from '../solicitation/solicitation.repository';
import { Csv } from './csv.entity';

@Injectable()
export class CsvService {

	public async importCsv(archiveName: string) {

		const csvParsed = await FileService.parse(archiveName) as Array<{}>;

		const savedArchive = await getRepository(Csv).save({ chapter_code: archiveName, received_data: csvParsed });

		for (const row of csvParsed) {

			await this.saveRowIntoDatabase(row, savedArchive.id);
		}
	}

	private async saveRowIntoDatabase(row: {}, archive_id: number) {

		const {
			order_number,
			aname,
			ncm_code,
			code_description,
			origin_country,
			aquisition_country,
			statistical_unit,
			measurement_unit,
			commercial_measurement,
			product_description,
			statistical_quantity,
			net_weight,
			vmle_dolar,
			vl_freight,
			vl_secure,
			commercial_quantity,
			product_unit_value,
			total_product_unit,
			landing_unit,
			resourcefulness_unit,
			incoterm,
			nat_information,
			dispatch_situation,
		} = CsvColumnIdentifier;

		const origin_country_id = await getCustomRepository(CountryRepository).saveCountryIfNotExists(row[origin_country]);
		const aquisition_country_id = await getCustomRepository(CountryRepository).saveCountryIfNotExists(row[aquisition_country]);

		const commercial_measurement_id = await getCustomRepository(MeasurementUnitRepository).saveMeasurementUnitIfNotExists(row[commercial_measurement]);
		const measurement_unit_id = await getCustomRepository(MeasurementUnitRepository).saveMeasurementUnitIfNotExists(row[measurement_unit]);

		const ncm_id = await getCustomRepository(NcmRepository).saveNcmIfNotExists({
			code: Number(row[ncm_code]),
			description: row[code_description],
			statistical_unit: row[statistical_unit] ? parseFloat(row[statistical_unit].replace(',', '.')) : undefined
		});

		const product_id = await getCustomRepository(ProductRepository).saveProductIfNotExists({
			description: row[product_description],
			ncm_id,
			measurement_unit_id,
			commercial_measurement_id,
			statistical_quantity: row[statistical_quantity] ? parseFloat(row[statistical_quantity].replace(',', '.')) : undefined,
			net_weight: row[net_weight] ? parseFloat(row[net_weight].replace(',', '.')) : undefined,
			commercial_quantity: row[commercial_quantity] ? parseFloat(row[commercial_quantity].replace(',', '.')) : undefined,
			unit_value: row[product_unit_value] ? parseFloat(row[product_unit_value].replace(',', '.')) : undefined,
		});

		const landing_place_id = await getCustomRepository(LandingPlaceRepository).saveLandingPlaceIfNotExists({
			name: row[landing_unit],
			resourcefulness_unit: row[resourcefulness_unit]
		});

		await getCustomRepository(SolicitationRepository).save({
			archive_id,
			order_number: Number(row[order_number]),
			aname: Number(row[aname]),
			vmle_dolar: row[vmle_dolar] ? parseFloat(row[vmle_dolar].replace(',', '.')) : undefined,
			vl_freight: row[vl_freight] ? parseFloat(row[vl_freight].replace(',', '.')) : undefined,
			vl_secure: row[vl_secure] ? parseFloat(row[vl_secure].replace(',', '.')) : undefined,
			total_product_unit: row[total_product_unit] ? parseFloat(row[total_product_unit].replace(',', '.')) : undefined,
			incoterm: row[incoterm],
			nat_information: row[nat_information],
			dispatch_situation: row[dispatch_situation],
			competence_date: new Date(Number(row[aname].slice(0, 4)), Number(row[aname].slice(4)) - 1),
			product_id,
			origin_country_id,
			aquisition_country_id,
			landing_place_id,
		});
	}
}