import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { CsvModule } from './modules/csv/csv.module';

@Module({
	imports: [
		CsvModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'node',
			password: 'node@1234',
			database: 'dotnet',
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true,
		})],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule { }