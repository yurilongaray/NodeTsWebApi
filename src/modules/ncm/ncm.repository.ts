import { Ncm } from './ncm.entity';
import { EntityRepository, getRepository, DeepPartial } from 'typeorm';

@EntityRepository(Ncm)
export class NcmRepository {

	public async save(newNcm: DeepPartial<Ncm>) {

		// const {
		// 	ncm_number,
		// 	aname,
		// 	code,
		// 	code_description,
		// 	origin_country_id,
		// 	aquisition_country_id,
		// 	statistical_unit,
		// 	statistical_quantity,
		// 	landing_place_id,
		// 	incoterm,
		// 	nat_information,
		// 	dispatch_situation } = saveOptions;

		// const newNcm = new Ncm();

		// newNcm.ncm_number = Number(ncm_number);
		// newNcm.aname = aname;
		// newNcm.code = Number(code);
		// newNcm.code_description = code_description;
		// newNcm.origin_country_id = origin_country_id;
		// newNcm.aquisition_country_id = aquisition_country_id;
		// newNcm.product_id = product_id;
		// newNcm.statistical_unit = parseFloat(statistical_unit.replace(',', '.'));
		// newNcm.statistical_quantity = parseFloat(statistical_quantity.replace(',', '.'));
		// newNcm.landing_place_id = landing_place_id;
		// newNcm.incoterm = incoterm;
		// newNcm.nat_information = nat_information;
		// newNcm.dispatch_situation = dispatch_situation;

		return getRepository(Ncm).save(newNcm).then(product => product.id);
	}
}