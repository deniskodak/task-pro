import { Pipe } from '@angular/core';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

@Pipe({
  standalone: true,
  name: 'customDate',
})
export class CustomDatePipe {
  transform(value: Date) {
    const date = new Date(value).getDate();
    const month = MONTHS[new Date(value).getMonth()];
    const prefix = this.isToday(value) ? 'Today, ' : ''
    return prefix + month + ' ' + date;
  }

  isToday(date: Date) {
    const isSameMonth = new Date(date).getMonth() === new Date().getMonth()
    const isSameDay = new Date(date).getDate() === new Date().getDate()
    const isSameYear = new Date(date).getFullYear() === new Date().getFullYear()
    return isSameMonth && isSameDay && isSameYear
  }
}
