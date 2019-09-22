import { Module } from '@nestjs/common';
import { CsvService } from './csv.service';
import { CsvController } from './csv.controller';
import { CsvRepository } from './csv.repository';

@Module({
	controllers: [CsvController],
	providers: [CsvService, CsvRepository],
})
export class CsvModule { }