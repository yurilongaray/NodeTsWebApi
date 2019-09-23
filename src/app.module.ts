import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { CsvModule } from './modules/csv/csv.module';
import { CountryModule } from './modules/country/country.module';

@Module({
	imports: [
		CountryModule,
		CsvModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: '127.0.0.1',
			port: 5432,
			username: 'postgres',
			password: 'postgres',
			database: 'db_project',
			entities: [__dirname + '/**/*.entity{.ts,.js}']
		})],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule { }