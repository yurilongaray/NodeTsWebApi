import { Product } from './product.entity';
import { EntityRepository, getRepository, DeepPartial } from 'typeorm';

@EntityRepository(Product)
export class ProductRepository {

	public async saveProductIfNotExists(saveOptions: DeepPartial<Product>) {

		const productFound = await Product.findOne({ description: saveOptions.description });

		if (!productFound) {

			return getRepository(Product).save(saveOptions).then(product => product.id);
		}

		return productFound.id;
	}
}