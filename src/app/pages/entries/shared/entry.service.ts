import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import { flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{

  constructor( public categoryService: CategoryService, protected inject: Injector) {

    super("api/entries", inject)
  }

   create(entry: Entry): Observable<Entry>{
     
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(cat => {
        entry.category = cat;
        return super.create(entry);
      })
    )
   }

   update(entry: Entry): Observable<Entry>{

    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(cat => {
        entry.category = cat; 
        return super.update(entry);
      })
    )
  }

}
