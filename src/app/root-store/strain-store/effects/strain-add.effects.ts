import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { StrainService } from "src/app/strains/strain.service";
import { strainActions } from "../actions";

@Injectable()
export class StrainAddEffects {

    constructor(
        private actions$: Actions,
        private strainService: StrainService,
        private router: Router
    ) {}

    addStrain$ = createEffect(() =>
        this.actions$.pipe(
            ofType(strainActions.StrainAddActions.addStrain),
            switchMap(action => 
              this.strainService.addEditStrain(action.strain).pipe(
                    map(strain => strainActions.StrainAddActions.addStrainSuccess({ strain })),
                    catchError(error => of(strainActions.StrainAddActions.addStrainFailure({ error })))
                )
            )
        )
    );

  returnToStrains$ = createEffect(() =>
    this.actions$.pipe(
      ofType(strainActions.StrainAddActions.cancelAddStrain,
        strainActions.StrainAddActions.addStrainSuccess),
      tap((action) =>
        this.router.navigate(['/dashboard/strains']))
    ), { dispatch: false });
  
} 
