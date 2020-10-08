import { 
  Controller, 
  Get, 
  Post, 
  Param, 
  Body, 
  HttpCode, 
  HttpStatus, 
  Res, 
  Patch, 
  Delete,
  Query, Inject }
  from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import {REQUEST} from '@nestjs/core';
import {Request} from 'express'
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

// takes in a string 'coffees' as the URL route
@Controller('coffees')
export class CoffeesController {
  // define constructor for coffees.service injectable
  // private => typescript shorthand => declares & initialize the CoffeeService member immediately & makes it only accessible in the class itself
  // readonly => best practice & ensures not modifying the service & only accessing things from it
  // coffeeService is just naming our parameter 
  constructor(private readonly coffeeService: CoffeesService,
    //Injecting the ORIGINAL Request object
    @Inject(REQUEST) private readonly request: Request)
  {
    console.log('CoffeesController Instantiated')
  }
  // create get method 
  // add get method decorator first
  // pass in another string to create a nested route e.g. 'flavours'
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // const {limit, offset} = paginationQuery;
    // return `This action returns all coffees. Limit ${limit}, offset: ${offset}`;
    return this.coffeeService.findAll(paginationQuery)
  }

  /* You can modify the response object and put in your own custom response codes but this 
  can be problematic so stick to the default one that Nest creates for you
  */
  // @Get()
  // findAll(@Res() response) {
  //   response.status(200).send('This action returns all coffees');
  // }

  // @Get(':id')
  // findOne(@Param() params) {
  //   return `This action returns #${params.id} coffee`
  // }

  @Get(':id')
  // change id to number from 'string' to test transform property
  findOne(@Param('id') id: number) {
    // will now return number rather than string
    console.log(typeof id);
    // return `This action returns #${id} coffee`
    return this.coffeeService.findOne('' + id);
  }

  // Post request
  @Post()
  // set a status code
  // @HttpCode(HttpStatus.GONE)
  // change body to CreateCoffeeDto so that now we know what to expect from our payload i.e. name, brand, flavours
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    // return body;
    // if you pass in JSON it will return the entire JSON you pass in 
    return this.coffeeService.create(createCoffeeDto);
  }

  // Put replaces entire resource so need to have the entire request object in the payload

  // Patch only modifies a resource partially, allowing us to modify only a single property of a resource if required
  // pass in @Param('id') to grab the id from the incoming request & to indicate what property to update & also the request payload 
  @Patch(':id')
  update(@Param('id') id:string, @Body() UpdateCoffeeDto: UpdateCoffeeDto) {
    // return `This action updates #${id} coffee`
    return this.coffeeService.update(id, UpdateCoffeeDto)
  }

  // add in @Param(id) decorator to grab the id from the incoming request
  @Delete(':id')
  remove(@Param('id') id: string) {
    // return `This action removes #${id} coffee`
    this.coffeeService.remove(id);
  }



}
