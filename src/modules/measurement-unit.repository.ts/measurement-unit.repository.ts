import { MeasurementUnit } from './measurement-unit.entity';
import { EntityRepository, getRepository } from 'typeorm';

@EntityRepository(MeasurementUnit)
export class MeasurementUnitRepository {

	public async saveMeasurementUnitIfNotExists(name: string) {

		const measurementUnitFound = await MeasurementUnit.findOne({ name });

		if (!measurementUnitFound) {

			return getRepository(MeasurementUnit).save({ name }).then(measurementUnit => measurementUnit.id);
		}

		return measurementUnitFound.id;
	}
}