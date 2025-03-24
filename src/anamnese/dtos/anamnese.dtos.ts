import { AnamnesisEntity } from '../entities/anamnese.entity';

export class AnamneseDto {
  id: number;
  customer_id: number;
  hasDiabetesOrHypertension: string;
  painOrInjuries: string;
  youSurgery: string;
  heartDisease: string;
  isPregnant: boolean;
  medicationsOrSupplements: string;
  etilismo: string;
  smoking: string;
  food: string;
  isVegetarian: boolean;
  isVegan: boolean;
  physicalActivity: string;
  intentionsStartingSportsConsultancy: string;
  lookingForRacingAdvice: string;
  runningExperience: string;
  strengtheningTraining: string;
  runningCompetitionExperience: string;
  youLookingForRaceConsultancy: string;
  runningEventsFuture: string;
  raceOnYourFutureCalendar: string;
  daysOfTheWeekRun: string;
  hasRunningClock: string;
  longestRunningDistance: string;
  bestRunningTime: string;
  disease: string;
  daysTheWeekSportsConsultancy: string;
  createdAt: Date;
  updatedAt: Date;
  read: boolean;

  constructor(anamnesisEntity: AnamnesisEntity) {
    this.id = anamnesisEntity.id;
    this.customer_id = anamnesisEntity.customer_id;
    this.hasDiabetesOrHypertension = anamnesisEntity.hasDiabetesOrHypertension;
    this.painOrInjuries = anamnesisEntity.painOrInjuries;
    this.youSurgery = anamnesisEntity.youSurgery;
    this.heartDisease = anamnesisEntity.heartDisease;
    this.isPregnant = anamnesisEntity.isPregnant;
    this.medicationsOrSupplements = anamnesisEntity.medicationsOrSupplements;
    this.etilismo = anamnesisEntity.etilismo;
    this.smoking = anamnesisEntity.smoking;
    this.food = anamnesisEntity.food;
    this.isVegetarian = anamnesisEntity.isVegetarian;
    this.isVegan = anamnesisEntity.isVegan;
    this.physicalActivity = anamnesisEntity.physicalActivity;
    this.intentionsStartingSportsConsultancy =
      anamnesisEntity.intentionsStartingSportsConsultancy;
    this.lookingForRacingAdvice = anamnesisEntity.lookingForRacingAdvice;
    this.runningExperience = anamnesisEntity.runningExperience;
    this.strengtheningTraining = anamnesisEntity.strengtheningTraining;
    this.runningCompetitionExperience =
      anamnesisEntity.runningCompetitionExperience;
    this.youLookingForRaceConsultancy =
      anamnesisEntity.youLookingForRaceConsultancy;
    this.runningEventsFuture = anamnesisEntity.runningEventsFuture;
    this.raceOnYourFutureCalendar = anamnesisEntity.raceOnYourFutureCalendar;
    this.daysOfTheWeekRun = anamnesisEntity.daysOfTheWeekRun;
    this.hasRunningClock = anamnesisEntity.hasRunningClock;
    this.longestRunningDistance = anamnesisEntity.longestRunningDistance;
    this.bestRunningTime = anamnesisEntity.bestRunningTime;
    this.disease = anamnesisEntity.disease;
    this.daysTheWeekSportsConsultancy =
      anamnesisEntity.daysTheWeekSportsConsultancy;
    this.createdAt = anamnesisEntity.createdAt;
    this.updatedAt = anamnesisEntity.updatedAt;
    this.read = anamnesisEntity.read;
  }
}
