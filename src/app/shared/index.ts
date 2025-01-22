import { FormControl } from '@angular/forms';

export type FormModel<T> = {
  [Property in keyof T]: FormControl<T[Property]>;
};
