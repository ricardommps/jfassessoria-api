import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnamneseModule } from './anamnese/anamnese.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CustomersModule } from './customers/customers.module';
import { FinishedTrainingModule } from './finished-training/finished-training.module';
import { RolesGuard } from './guards/roles.guard';
import { MediaModule } from './media/media.module';
import { MetricsModule } from './metrics/metrics.module';
import { PaymentModule } from './payment/payment.module';
import { ProgramModule } from './program/program.module';
import { RatingModule } from './rating/rating.module';
import { TrainingModule } from './training/training.module';
import { TrainingFeedbackModule } from './training_feedback/training_feedback.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun: true,
      ssl: true,
    }),
    CustomersModule,
    UserModule,
    AuthModule,
    JwtModule,
    ProgramModule,
    TrainingModule,
    PaymentModule,
    FinishedTrainingModule,
    TrainingFeedbackModule,
    MetricsModule,
    MediaModule,
    CloudinaryModule,
    RatingModule,
    AnamneseModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
