import { FormControl } from '@angular/forms';

// mapped type - created a new type from an existing type
export type FormModel<T> = {
  [Property in keyof T]: FormControl<T[Property]>;
};
