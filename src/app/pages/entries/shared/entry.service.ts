import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import { flatMap, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{

  constructor( public categoryService: CategoryService, protected inject: Injector) {

    super("api/entries", inject, Entry.fromJson)
  }

   create(entry: Entry): Observable<Entry>{
     return this.setCategoryAndSendToServer(entry, super.create.bind(this));
   }

   update(entry: Entry): Observable<Entry>{
    return this.setCategoryAndSendToServer(entry, super.update.bind(this));
  }

  getByMonthAndYear(month: number, year:number): Observable<Entry[]>{
    return this.getAll().pipe(
      map(entries=> this.filterByMonthAndYear(entries,month,year))
    )
  }

  private filterByMonthAndYear(entries: Entry[], month: number, year: number){
    return entries.filter(entry =>{
      const entryDate = moment(entry.date, "DD/MM/YYYY");
      const monthMatchs = entryDate.month() + 1 == month;
      const yearMatchs = entryDate.year()  == year;
      if( monthMatchs &&  yearMatchs ) return entry;
    })
  }
  private setCategoryAndSendToServer(entry: Entry, sendFn: (entry: Entry) =>Observable<Entry>): Observable<Entry>{
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(cat => {
        entry.category = cat; 
        return sendFn(entry);
      }),
      catchError(this.handleError)
    )
  }

}
