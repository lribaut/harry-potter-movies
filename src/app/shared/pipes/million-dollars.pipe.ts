import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millionDollars',
  standalone: true
})
export class MillionDollarsPipe implements PipeTransform {

  transform(budget: string): string {
      return `$${budget} million`;
  }

}
