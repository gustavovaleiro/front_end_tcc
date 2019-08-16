import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import { flatMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
