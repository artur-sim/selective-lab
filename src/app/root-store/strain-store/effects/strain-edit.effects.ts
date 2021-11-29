import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { StrainService } from "src/app/strains/strain.service";
import { strainActions } from "../actions";

@Injectable()
export class StrainEditEffects {

  constructor(
    private actions$: Actions,
    private strainService: StrainService,
    private router: Router
  ) { }

  editStrain$ = createEffect(() =>
    this.actions$.pipe(
      ofType(strainActions.StrainEditActions.editStrain),
      switchMap(action =>
        this.strainService.addEditStrain(action.strain).pipe(
          map(strain => strainActions.StrainEditActions.editStrainSuccess({ strain })),
          catchError(error => of(strainActions.StrainEditActions.editStrainFailure({ error })))
        )
      )
    )
  );
  $loadStrain = createEffect(() =>
    this.actions$.pipe(
      ofType(strainActions.StrainEditActions.loadStrain),
      switchMap(action =>
        this.strainService.getStrain(action.id).pipe(
          map(strain => strainActions.StrainEditActions.loadStrainSuccess({ strain })),
          catchError(error => of(strainActions.StrainEditActions.loadStrainFailure({ error })))
        )
      )
    )
  );

  returnToStrains$ = createEffect(() =>
    this.actions$.pipe(
      ofType(strainActions.StrainEditActions.editStrainSuccess,
        strainActions.StrainEditActions.cancelEditStrain),
      tap((action) => this.router.navigate(['/dashboard/strains']))
    ), { dispatch: false });
  ;
} 

