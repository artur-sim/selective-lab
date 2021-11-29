import { createAction, props } from "@ngrx/store";
import { StrainSummary, AddEditResult } from "src/app/shared/models/strains/strain-summary.model";
import { Strain } from "src/app/shared/models/strains/strain.model";

export const editStrain = createAction(
    '[Edit Strain Component] Add/Edit Strain',
    props<{ strain: Strain }>()
);

export const loadStrain = createAction(
  '[Strain Details Component] Load Strain',
  props<{ id: string }>()
);

export const editStrainSuccess = createAction(
  '[Strain API] Edit Strain Success',
  props<{ strain: StrainSummary }>()
);

export const editStrainFailure = createAction(
    '[Strain API] Edit Strain Failure',
    props<{ error: any }>()
);

export const redirectToNewStrain = createAction(
    '[Strain API] Redirect To Modified Strain'
);

export const loadStrainSuccess = createAction(
  '[Strain API] Load Strain Success',
  props<{ strain: StrainSummary }>()
);

export const loadStrainFailure = createAction(
  '[Strain API] Load Strain Failure',
  props<{ error: any }>()
);

export const cancelEditStrain = createAction(
  '[Strain API] Cancel Edit Strain'
);
