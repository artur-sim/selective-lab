import { createAction, props } from "@ngrx/store";

import { StrainSummary } from "src/app/shared/models/strains/strain-summary.model";

export const loadStrain = createAction(
    '[Strain Details Component] Load Strain',
    props<{ id: string }>()
);

export const loadStrainSuccess = createAction(
    '[Strain API] Load Strain Success',
    props<{ strain: StrainSummary }>()
);

export const loadStrainFailure = createAction(
    '[Strain API] Load Strain Failure',
    props<{ error: any }>()
);


