import * as zod from 'zod';

export const VehicleSchema = zod.object({
  id: zod.string(),
  make: zod.string(),
  model: zod.string(),
  year: zod.number(),
});

export const VehiclesSchema = zod.array(VehicleSchema);
// export type Vehicle = {
//   id: string;
//   make: string;
//   model: string;
//   year: number;
// };

export type Vehicle = zod.infer<typeof VehicleSchema>;

export type VehicleCreateModel = Omit<Vehicle, 'id'>;

// export type VehicleFormThing = {
//   make: AbstractControl<string>;
//   model: AbstractControl<string>;
//   year: AbstractControl<number>;
// };
