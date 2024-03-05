import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(value: any): string {
    if (!value || typeof value !== 'object') {
      return '';
    }

    const hours = value.hours ? `${value.hours}h` : '';
    const minutes = value.minutes ? `${value.minutes}m` : '';

    return `${hours} ${minutes}`.trim();
  }
}
