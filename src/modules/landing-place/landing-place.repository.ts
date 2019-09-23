import { LandingPlace } from './landing-place.entity';
import { EntityRepository, getRepository, DeepPartial } from 'typeorm';

@EntityRepository(LandingPlace)
export class LandingPlaceRepository {

	public async saveLandingPlaceIfNotExists(saveOptions: DeepPartial<LandingPlace>) {

		const landingPlaceFound = await LandingPlace.findOne({ name: saveOptions.name });

		if (!landingPlaceFound) {

			return getRepository(LandingPlace).save(saveOptions).then(landingPlace => landingPlace.id);
		}

		return landingPlaceFound.id;
	}
}