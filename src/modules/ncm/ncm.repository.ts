import { Ncm } from './ncm.entity';
import { EntityRepository, getRepository, DeepPartial } from 'typeorm';

@EntityRepository(Ncm)
export class NcmRepository {

	public async saveNcmIfNotExists(saveOptions: DeepPartial<Ncm>) {

		const landingPlaceFound = await Ncm.findOne({ code: saveOptions.code });

		if (!landingPlaceFound) {

			return getRepository(Ncm).save(saveOptions).then(landingPlace => landingPlace.id);
		}

		return landingPlaceFound.id;
	}
}