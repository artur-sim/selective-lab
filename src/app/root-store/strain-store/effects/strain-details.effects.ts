import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { StrainService } from "src/app/strains/strain.service";
import { strainActions } from "../actions";

@Injectable()
export class StrainDetailsEffects {

    constructor(
        private action$: Actions,
        private strainService: StrainService
    ) {}

    $loadStrain = createEffect(() =>
        this.action$.pipe(
            ofType(strainActions.StrainDetailsActions.loadStrain),
            switchMap(action =>
                this.strainService.getStrain(action.id).pipe(
                    map(strain => strainActions.StrainDetailsActions.loadStrainSuccess({ strain })),
                    catchError(error => of(strainActions.StrainDetailsActions.loadStrainFailure({ error })))
                )
            )
        )
    );

  
}
