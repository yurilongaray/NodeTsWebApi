import { Product } from './product.entity';
import { EntityRepository, getRepository } from 'typeorm';

export interface IProduct {
	measurement_unit_id?: number;
	commercial_measurement_id?: number;
	net_weight?: string;
	product_unit_value?: string;
}
@EntityRepository(Product)
export class ProductRepository {

	public async saveProductIfNotExists(description: string, saveOptions: IProduct) {

		const {
			measurement_unit_id,
			commercial_measurement_id,
			net_weight,
			product_unit_value,
		} = saveOptions;

		const productFound = await Product.findOne({ description });

		if (!productFound) {

			const newProduct = new Product();

			newProduct.description = description;
			newProduct.measurement_unit_id = measurement_unit_id;
			newProduct.commercial_measurement_id = commercial_measurement_id;
			newProduct.net_weight = parseFloat(net_weight.replace(',', '.'));
			newProduct.unit_value = parseFloat(product_unit_value.replace(',', '.'));

			return getRepository(Product).save(newProduct).then(product => product.id);
		}

		return productFound.id;
	}
}