import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import * as root from 'app-root-path';
import { CsvRepository } from './csv.repository';

@Injectable()
export class CsvService {

	constructor(private readonly csvRepository: CsvRepository) { }

	public async importCsv(archiveName?: string) {

		const csvParsed = await this.readFile();

		const x = await this.csvRepository.getAll();

		console.log('x', x);
	}

	private readFile() {

		return new Promise((resolve, reject) => {

			try {

				const csvRows = [];

				fs.createReadStream(`${root.path}/data/CAP01/CAPI011905.CSV`)
					.pipe(csv({
						separator: '@',
					}))
					.on('data', (row) => {

						const newRow = {};

						for (const key of Object.keys(row)) {

							// if (key.includes(CsvColumnIdentifier.vmle_dolar)) {

							//     console.log(row[key]);

							//     newRow[key.replace(/^[ ]+|[ ]+$/g, '')] = row[key];
							// }

							newRow[key.replace(/^[ ]+|[ ]+$/g, '')] = row[key]
								? row[key].replace(/^[ ]+|[ ]+$/g, '').replace(/\uFFFD/g, '')
								: '';
						}

						// console.log(newRow);
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