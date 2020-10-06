import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromiseUtils, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavour)
    private readonly flavourRepository: Repository<Flavour>
  ) {}

  findAll() {
    return this.coffeeRepository.find({
      // passing in 'flavours' since we labeled that column as our relation for coffee
      relations: ['flavours']
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne(id, {relations: ['flavours']});
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  // this method maps through all the flavours in createCoffeeDto & then calls the preloadFlavourByName method to populate it
  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavours = await Promise.all(
      createCoffeeDto.flavours.map(name => this.preloadFlavourByName(name))
    )

    const coffee = this.coffeeRepository.create(
      {...createCoffeeDto,
      flavours,
    });
    return this.coffeeRepository.save(coffee);
  }

  // note, in our patch operation, flavours is optional
  // so create condition to make sure we have flavours before calling the map method
  // otherwise, error if flavour is undefined
  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavours = updateCoffeeDto.flavours && 
    (await Promise.all(
      updateCoffeeDto.flavours.map(name => this.preloadFlavourByName(name)),
    ));

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavours
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  // creates a new class instance of flavour with the name we passed in
  private async preloadFlavourByName(name: string): Promise<Flavour> {
    const existingFlavour = await this.flavourRepository.findOne({name});
    if (existingFlavour) {
      return existingFlavour;
    }
    return this.flavourRepository.create({name});
  }
}