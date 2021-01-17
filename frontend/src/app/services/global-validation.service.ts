import { Injectable } from '@angular/core';

@Injectable()
export class GlobalValidationService {
    validatePassword(password: any): any {
        console.log(password);
        var p = password
        if(p && p.length > 0){
          if (p.length < 8) {
            return 'Your password must be at least 8 characters';
          }
          else if (p.search(/[a-z]/) < 0) {
            return 'Your password must contain at least one lowercase.';
          }
          else if (p.search(/[A-Z]/) < 0) {
            return 'Your password must contain at least one uppercase.';
          }
          else if (p.search(/[0-9]/) < 0) {
            return 'Your password must contain at least one digit.';
          }
          else if (p.search(/[!#$%&?@^&* "]/) < 0) {
            return 'Your password must contain at least one type of special character.';
          }
          else
          return null;
        }
      }
}