
import * as csv from 'csv-parser';

export abstract class HelperService {

	public static async convertToNumeric(value: string) {

		return parseFloat(value.replace(',', '.'));
	}
}