import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  currentDateTime() {
    var date = new Date;
    date.setUTCFullYear(date.getUTCFullYear());
    date.setUTCMonth(date.getUTCMonth());
    date.setUTCDate(date.getUTCDate());
    date.setUTCHours(date.getUTCHours());
    date.setUTCMinutes(date.getUTCMinutes());
    date.setUTCSeconds(date.getUTCSeconds());
    
    return date;
  }
}
