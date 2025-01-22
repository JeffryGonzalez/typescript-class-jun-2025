export type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
};

export type VehicleCreateModel = Omit<Vehicle, 'id'>;

// export type VehicleFormThing = {
//   make: AbstractControl<string>;
//   model: AbstractControl<string>;
//   year: AbstractControl<number>;
// };
