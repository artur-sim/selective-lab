import { createAction, props } from "@ngrx/store";


export const deleteStrain = createAction(
  '[Delete Strain Component] Delete Strain',
  props<{ strainId: number }>()
);

export const deleteStrainSuccess = createAction(
  '[Strain API] Delete Strain Success',
  props<{ strainId: number }>()
);

export const deleteStrainFailure = createAction(
    '[Strain API] Delete Strain Failure',
    props<{ error: any }>()
);


