import { Controller, Get } from '@nestjs/common';
import { CsvService } from './csv.service';

@Controller('v1/csv')
export class CsvController {

    // tslint:disable-next-line: no-empty
    constructor(private readonly csvService: CsvService) {}

    @Get()
    public getAll() {

        return this.csvService.importCsv();
    }
}
