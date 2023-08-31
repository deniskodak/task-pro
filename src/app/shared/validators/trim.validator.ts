import { AbstractControl, ValidationErrors } from '@angular/forms';

export const trimValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value;
  if (!value || value === '') return null;

  if (!value.trim()) {
    control.setValue(control.value?.trim(), {
      emitEvent: false,
      onlySelf: true,
    });
  }

  return null;
};
