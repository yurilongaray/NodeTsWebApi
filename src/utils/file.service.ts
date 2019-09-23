
import * as csv from 'csv-parser';
import * as fs from 'fs';
import * as root from 'app-root-path';
import * as PDFDocument from 'pdfkit';

export abstract class FileService {

	public static async csvParse(archiveName: string) {

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

	public static async pdfGenerate(data: any) {

		const doc = new PDFDocument();

		doc.pipe(fs.createWriteStream('./pdf/output.pdf'));

		doc.fontSize(15)
			.text('País por Valor Total no Local de Embarque na Moeda');

		for (const row of data) {

			doc.fontSize(10)
				.text(`${row.name}: $ ${row.sum}`, {
					paragraphGap: 5,
					indent: 5,
					align: 'justify',
					columns: 1,
				});
		}

		doc.end();

		return 'Generated';
	}
}