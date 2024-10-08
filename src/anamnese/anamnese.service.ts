import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from 'src/customers/customers.service';
import { Repository } from 'typeorm';
import { AnamnesisEntity } from './entities/anamnese.entity';

@Injectable()
export class AnamneseService {
  constructor(
    @InjectRepository(AnamnesisEntity)
    private readonly anamneseRepository: Repository<AnamnesisEntity>,

    private readonly customersService: CustomersService,
  ) {}
  async createAnamnese(anamnese) {
    let customer;
    try {
      const customerData = {
        name: anamnese.name,
        email: anamnese.email,
        phone: anamnese.phone,
        maritalStatus: anamnese.maritalStatus, //NOVO
        zipCode: anamnese.zipCode, //NOVO
        complement: anamnese.complement, //NOVO
        street: anamnese.street, //NOVO
        streetNumber: anamnese.streetNumber, //NOVO
        city: anamnese.city, //NOVO
        state: anamnese.state, //NOVO
        district: anamnese.district, //NOVO
        fatPercentage: anamnese.fatPercentage, //NOVO
        weight: anamnese.weight,
        height: anamnese.height,
        isRunner: false,
        isStrength: false,
        gender: anamnese.gender,
        birthDate: new Date(anamnese.birthDate),
        active: true,
      };

      customer = await this.customersService.createCustomerAnamnese(
        customerData,
      );
      if (!customer) {
        throw new Error(`Error creating anamnese`);
      }
      const anamneseData = {
        customer_id: customer.id,
        ...anamnese,
      };
      return this.anamneseRepository.save(anamneseData);
    } catch (error) {
      if (customer) {
        await this.customersService.deleteCustomer(customer.id);
      }
      throw new Error(`Error creating anamnese, ${error}`);
    }
  }

  async listAnamnese(customerId: number, userId: number) {
    const anamnese = await this.anamneseRepository.findOne({
      where: {
        customer_id: customerId,
        customer: {
          userId, // Filtrando pelo id do cliente
        },
      },
      relations: {
        customer: true,
      },
    });
    if (!anamnese) {
      throw new NotFoundException(`Anamnese Not Found`);
    }
    return anamnese;
  }

  async readAnamnese(anamneseId: number) {
    const anamnese = await this.anamneseRepository.findOne({
      where: {
        id: anamneseId,
      },
    });
    anamnese.read = true;
    return this.anamneseRepository.save({
      ...anamnese,
    });
  }
}
