import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStrains from './strains.reducer';

export const getStrains = (state: fromStrains.StrainState) => state.strains;
export const getError = (state: fromStrains.StrainState) => state.error;
export const getCurrentStrain = (state: fromStrains.StrainState) => state.currentStrain;

export const selectStrainsState = createFeatureSelector<fromStrains.StrainState>(
    fromStrains.strainFeatureKey
);

export const selectStrains = createSelector(
    selectStrainsState,
    getStrains
);

export const selectError = createSelector(
    selectStrainsState,
    getError
);

export const selectCurrentStrain = createSelector(
    selectStrainsState,
    getCurrentStrain
);


