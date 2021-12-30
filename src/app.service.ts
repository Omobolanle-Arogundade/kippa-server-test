import { Injectable } from '@nestjs/common';
import { CalculateServerDto, ServerDto } from './dto/app.dto';

@Injectable()
export class AppService {
  /**
   *
   * @returns {String} - Server Name
   */
  getServerName(): string {
    return 'SERVER PLANNER SERVICE!';
  }

  /**
   *
   * @param calculateServerDto
   * @returns {Number} - The number of servers required to run the Virtual Machines
   */
  calculateServer(calculateServerDto: CalculateServerDto): number {
    const { server, vms } = calculateServerDto;
    let serversRequired = 0; // Set initial value of required servers to zero

    /**
     * 1. Clean out oversized vms
     * 2. Sum up all the remaining vm attributes
     * @param sum
     * @param param1
     * @returns
     */
    const getSum = (sum: ServerDto, { CPU, HDD, RAM }: ServerDto) => {
      if (CPU <= server.CPU && HDD <= server.HDD && RAM <= server.RAM) {
        return { CPU: sum.CPU + CPU, HDD: sum.HDD + HDD, RAM: sum.RAM + RAM };
      }
      return sum;
    };

    const capacityRequired = vms.reduce(getSum, { CPU: 0, HDD: 0, RAM: 0 });

    /**
     * loop through the total capacity requirement and assign the highest value to be number of servers required
     */
    for (const key in capacityRequired) {
      if (Object.prototype.hasOwnProperty.call(capacityRequired, key)) {
        const required = Math.ceil(capacityRequired[key] / server[key]);

        serversRequired =
          serversRequired < required ? required : serversRequired;
      }
    }
    return serversRequired;
  }
}
