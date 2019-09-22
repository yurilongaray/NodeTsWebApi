import { Solicitation } from './solicitation.entity';
import { EntityRepository, getRepository, DeepPartial } from 'typeorm';

@EntityRepository(Solicitation)
export class SolicitationRepository {

	public async save(newSolicitation: DeepPartial<Solicitation>) {

		return getRepository(Solicitation).save(newSolicitation).then(solicitation => solicitation.id);
	}
}