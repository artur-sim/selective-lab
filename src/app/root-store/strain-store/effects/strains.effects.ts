import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { StrainService } from "src/app/strains/strain.service";
import { strainActions } from '../actions';

@Injectable()
export class StrainsEffects {

    constructor(
        private actions$: Actions,
        private strainService: StrainService
    ) {}

    loadStrains$ = createEffect(() =>
        this.actions$.pipe(
            ofType(strainActions.StrainsActions.getStrains),
            switchMap(action =>
                this.strainService.getStrains().pipe(
                    map(strains => strainActions.StrainsActions.getStrainsSuccess({ strains })),
                    catchError(error => of(strainActions.StrainsActions.getStrainsFailure({ error })))
                )
            )
        )
  );

  deleteStrain$ = createEffect(() =>
    this.actions$.pipe(
      ofType(strainActions.StrainDeleteActions.deleteStrain),
      switchMap(action =>
        this.strainService.deleteStrain(action.strainId).pipe(
          map(strainId => strainActions.StrainDeleteActions.deleteStrainSuccess({ strainId })),
          catchError(error => of(strainActions.StrainDeleteActions.deleteStrainFailure({ error })))
        )
      )
    )
  );
}
