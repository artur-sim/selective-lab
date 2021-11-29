import { createAction, props } from "@ngrx/store";
import { StrainSummary } from "src/app/shared/models/strains/strain-summary.model";
import { Strain } from "src/app/shared/models/strains/strain.model";

export const addStrain = createAction(
    '[Add Strain Component] Add Strain',
    props<{ strain: Strain }>()
);

export const addStrainSuccess = createAction(
    '[Strain API] Add Strain Success',
    props<{ strain: StrainSummary }>()
);

export const addStrainFailure = createAction(
    '[Strain API] Add Strain Failure',
    props<{ error: any }>()
);

export const redirectToNewStrain = createAction(
    '[Strain API] Redirect To New Strain'
);

export const cancelAddStrain = createAction(
  '[Strain API] Cancel Add Strain'
);
