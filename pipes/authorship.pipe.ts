import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authorship'
})
export class AuthorshipPipe implements PipeTransform {

  transform(authorship: string[]): string {
    if (authorship) {
      return authorship[0]
    }
    return ''
  }

}
