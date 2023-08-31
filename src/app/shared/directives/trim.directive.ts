import { Directive } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from "@angular/forms";
import { trimValidator } from "../validators/trim.validator";

@Directive({
    standalone: true,
    selector: '[trimDirective]',
    providers: [{ provide: NG_VALIDATORS, useExisting: TrimDirective, multi: true }]
  })
  export class TrimDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
    
      return trimValidator(control);
    }
  }