import { LandingPlace } from './landing-place.entity';
import { EntityRepository, getRepository } from 'typeorm';

export interface ILandingPlace {
	resourcefulness_unit?: string;
}

@EntityRepository(LandingPlace)
export class LandingPlaceRepository {

	public async saveLandingPlaceIfNotExists(name: string, saveOptions: ILandingPlace) {

		const landingPlaceFound = await LandingPlace.findOne({ name });

		if (!landingPlaceFound) {

			const newlandingPlace = new LandingPlace();

			newlandingPlace.name = name;
			newlandingPlace.resourcefulness_unit = saveOptions.resourcefulness_unit;

			return getRepository(LandingPlace).save(newlandingPlace).then(landingPlace => landingPlace.id);
		}

		return landingPlaceFound.id;
	}
}