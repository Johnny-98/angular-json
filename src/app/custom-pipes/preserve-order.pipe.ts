import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preserveOrder',
})
export class PreserveOrderPipe implements PipeTransform {
  transform(object: any): any[] {
    if (!object || typeof object !== 'object') {
      return [];
    }
    
    // Extract the keys in the order they appear
    const orderedKeys = Object.keys(object);

    // Map the keys to their corresponding values
    return orderedKeys.map((key) => ({ key, value: object[key] }));
  }
}

// a pipe is used to process or transform data from one format or state to another
// commonly used for data manipulation, filtering, formatting, and transformation tasks
