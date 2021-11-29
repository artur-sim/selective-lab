import { Action, createReducer, on } from "@ngrx/store";

import { StrainSummary } from "src/app/shared/models/strains/strain-summary.model";
import { strainActions } from "./actions";
import { map } from "rxjs/operators";

export const strainFeatureKey = 'strain';

export interface StrainState {
  strains: StrainSummary[];
  currentStrain: StrainSummary | null;
    error: string;

};

export const initialState: StrainState = {
    strains: [],
    currentStrain: null,
    error: ''
};

const strainsReducer = createReducer(
    initialState,
    on(strainActions.StrainDetailsActions.loadStrain, (state, action) => (
        {
            ...state,
            currentStrain: null,
            error: ''
        }
    )),
    on(strainActions.StrainsActions.getStrainsSuccess, (state, action) => (
        {
            ...state,
            strains: action.strains,
            error: ''
        }
    )),
  on( strainActions.StrainEditActions.loadStrainSuccess,
      strainActions.StrainDetailsActions.loadStrainSuccess, (state, action) => (
    {
      ...state,
      currentStrain: action.strain,
      error: ''
    }
  )),
  on(strainActions.StrainEditActions.cancelEditStrain, (state, action) => (
      {
        ...state,
        currentStrain: null,
        error: ''
      }
    )),
    on(strainActions.StrainEditActions.editStrainSuccess, (state, action) => (
        {
        ...state,
        strains: state.strains.map(s => s.id !== action.strain.id ? s : action.strain),
            error: ''
        }
    )),
  on(strainActions.StrainAddActions.addStrainSuccess, (state, action) => (
    {
      ...state,
      strains:  [...state.strains, action.strain] ,
      error: ''
    }
  )),
  on(strainActions.StrainDeleteActions.deleteStrainSuccess, (state, action) => (
      {
        ...state,
        strains: state.strains.filter(s => s.id !== action.strainId),
        error: ''
      }
    )),
    on(strainActions.StrainsActions.getStrainsFailure,
       strainActions.StrainDetailsActions.loadStrainFailure,
      strainActions.StrainEditActions.editStrainFailure,
      strainActions.StrainAddActions.addStrainFailure,
      strainActions.StrainDeleteActions.deleteStrainFailure,
      (state, action) => (
        {
            ...state,
            error: action.error
        }
    ))
);

export function reducer(state: StrainState | undefined, action: Action) {
    return strainsReducer(state, action);
};
