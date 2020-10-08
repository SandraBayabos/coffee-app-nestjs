import { Injectable, Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../events/entities/event.entity'
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';
import {COFFEE_BRANDS} from './coffees.constants'

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

// Injectable just for example for factory provider
// @Injectable()
// export class CoffeeBrandsFactory {
//   create() {
//     /*...do something */
//     return ['buddy brew', 'nescafe']
//   }
// }

@Module({ 
  imports:[TypeOrmModule.forFeature([Coffee, Flavour, Event])],
  controllers: [CoffeesController],
  providers: [CoffeesService, 
    {
      provide: ConfigService,
      useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService: ProductionConfigService,
    },
    {
      // provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe']
      provide: COFFEE_BRANDS, 
      useFactory: () => ['buddy brew', 'nescafe'], 
      // scope: Scope.TRANSIENT,
    }
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}