import { createAction, props } from "@ngrx/store";
import { StrainSummary } from 'src/app/shared/models/strains/strain-summary.model';

export const getStrains = createAction(
    '[Strains Component] Get Strains'
);

export const getStrainsSuccess = createAction(
    '[Strains API] Get Strains Success',
    props<{ strains: StrainSummary[] }>()
);

export const getStrainsFailure = createAction(
    '[Strains API] Get Strains Failure',
    props<{ error: any }>()
);
