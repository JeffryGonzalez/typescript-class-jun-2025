import { FormControl } from '@angular/forms';

// mapped type - created a new type from an existing type
export type FormModel<T> = {
  [Property in keyof T]: FormControl<T[Property]>;
};

declare const brand: unique symbol;
export type Brand<T, TBrand extends string> = T & { [brand]: TBrand };

type HttpLink = `http://${string}`;
type HttpsLink = `https://${string}`;
export type Link = HttpLink | HttpsLink;
