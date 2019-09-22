import { Injectable } from '@nestjs/common';
import { FileService } from 'src/utils/file.service';
import { getCustomRepository, getRepository } from 'typeorm';
import { CsvColumnIdentifier } from './csv.enum';
import { CountryRepository } from '../country/country.repository';
import { ProductRepository } from '../product/product.repository';
import { MeasurementUnitRepository } from '../measurement-unit.repository.ts/measurement-unit.repository';
import { LandingPlaceRepository } from '../landing-place/measurement-unit.repository';
import { NcmRepository } from '../ncm/ncm.repository';
import { SolicitationRepository } from '../solicitation/solicitation.repository';
import { Csv } from './csv.entity';

@Injectable()
export class CsvService {

	public async importCsv(archiveName: string) {

		const csvParsed = await FileService.parse(archiveName) as Array<{}>;

		const archive = await getRepository(Csv).save({ chapter_code: archiveName, received_data: csvParsed });

		for (const row of csvParsed) {

			await this.saveRowIntoDatabase(row, archive.id);
		}
	}

	private async saveRowIntoDatabase(row: {}, archive_id: number) {

		const {
			ncm_number,
			ncm_name,
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
			dispatch_situation
		} = CsvColumnIdentifier;

		const origin_country_id = await getCustomRepository(CountryRepository).saveCountryIfNotExists(row[origin_country]);
		const aquisition_country_id = await getCustomRepository(CountryRepository).saveCountryIfNotExists(row[aquisition_country]);
		const commercial_measurement_id = await getCustomRepository(MeasurementUnitRepository).saveMeasurementUnitIfNotExists(row[commercial_measurement]);
		const measurement_unit_id = await getCustomRepository(MeasurementUnitRepository).saveMeasurementUnitIfNotExists(row[measurement_unit]);

		console.log('PASSOU 1');
		const product_id = await getCustomRepository(ProductRepository).saveProductIfNotExists(row[product_description], {
			measurement_unit_id,
			commercial_measurement_id,
			net_weight,
			product_unit_value
		});
		console.log('PASSOU 2');
		const landing_place_id = await getCustomRepository(LandingPlaceRepository).saveLandingPlaceIfNotExists(row[landing_unit], {
			resourcefulness_unit
		});

		console.log('PASSOU 3');
		const solicitation_id = await getCustomRepository(SolicitationRepository).save({
			product_id,
			vmle_dolar: row[vmle_dolar] ? parseFloat(row[vmle_dolar].replace(',', '.')) : undefined,
			vl_freight: row[vl_freight] ? parseFloat(row[vl_freight].replace(',', '.')) : undefined,
			vl_secure: row[vl_secure] ? parseFloat(row[vl_secure].replace(',', '.')) : undefined,
			commercial_quantity: row[commercial_quantity] ? parseFloat(row[commercial_quantity].replace(',', '.')) : undefined,
			total_product_unit: row[total_product_unit] ? parseFloat(row[total_product_unit].replace(',', '.')) : undefined
		});

		console.log('PASSOU 4');
		await getCustomRepository(NcmRepository).save({
			archive_id,
			ncm_number: Number(row[ncm_number]),
			aname: row[ncm_name],
			code: Number(row[ncm_code]),
			code_description: row[code_description],
			origin_country_id,
			aquisition_country_id,
			solicitation_id,
			landing_place_id,
			statistical_unit: row[statistical_unit] ? parseFloat(row[statistical_unit].replace(',', '.')) : undefined,
			statistical_quantity: row[statistical_quantity] ? parseFloat(row[statistical_quantity].replace(',', '.')) : undefined,
			incoterm: row[incoterm],
			nat_information: row[nat_information],
			dispatch_situation: row[dispatch_situation],
		});
	}
}