import { Solicitation } from './solicitation.entity';
import { EntityRepository, getRepository, DeepPartial } from 'typeorm';

@EntityRepository(Solicitation)
export class SolicitationRepository {

	public async save(saveOptions: DeepPartial<Solicitation>) {

		const solicitationFound = await Solicitation.findOne({ order_number: saveOptions.order_number });

		if (!solicitationFound) {

			return getRepository(Solicitation).save(saveOptions).then(solicitation => solicitation.id);
		}
	}
}