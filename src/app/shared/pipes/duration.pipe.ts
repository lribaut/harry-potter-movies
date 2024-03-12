import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {

  private readonly NUMBER_OF_MINUTES_IN_ONE_HOUR : number = 60;

  /**
   * Method to transform a string duration in minutes in a string with hours and minutes
   * @param durationInMinutes the duration to transform
   */
  transform(durationInMinutes: string): string {
    const totalDuration : number = Number(durationInMinutes);
    const hour : number  = Math.floor(totalDuration / this.NUMBER_OF_MINUTES_IN_ONE_HOUR);
    const minutes : number = Math.floor(totalDuration % this.NUMBER_OF_MINUTES_IN_ONE_HOUR);
    return `${hour}h ${minutes}min`;
  }

}
