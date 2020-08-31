import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString:string,searchColumn:string): any {
    if(value.length === 0 || filterString === '')
    return value;
    const projects =[];
    for(const project of value){
      if(project[searchColumn].toUpperCase().includes(filterString.toUpperCase()) ){
        projects.push(project);
      }
   }
   return projects;
  }

}
