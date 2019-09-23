
import * as csv from 'csv-parser';
import * as fs from 'fs';
import * as root from 'app-root-path';

export abstract class FileService {

	public static async parse(archiveName: string) {

		return new Promise((resolve, reject) => {

			try {

				const csvRows = [];

				fs.createReadStream(`${root.path}/data/${archiveName}`)
					.pipe(csv({
						separator: '@',
					}))
					.on('data', (row) => {

						const newRow = {};

						for (const key of Object.keys(row)) {

							newRow[key.replace(/^[ ]+|[ ]+$/g, '')] = row[key]
								? row[key].replace(/^[ ]+|[ ]+$/g, '').replace(/\uFFFD/g, '')
								: '';
						}

						csvRows.push(newRow);

					})
					.on('end', () => {

						console.info('CSV file successfully processed');

						resolve(csvRows);
					});
			} catch (error) {

				reject(error);
			}
		});
	}
}