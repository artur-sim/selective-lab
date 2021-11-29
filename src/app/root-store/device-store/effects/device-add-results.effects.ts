import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { DeviceService } from "src/app/devices/device.service";
import { deviceActions } from "../actions";

@Injectable()
export class DeviceAddResultsEffects {

    constructor(
        private actions$: Actions,
        private deviceService: DeviceService,
        private router: Router
    ) {}

    recordMeasurement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deviceActions.DeviceAddResultsActions.recordMeasurement),
            switchMap(action =>
                this.deviceService.recordMeasurement(action.measurement).pipe(
                    map(measurement => deviceActions.DeviceAddResultsActions.recordMeasurementSuccess({ measurement })),
                    catchError(error => of(deviceActions.DeviceAddResultsActions.recordMeasurementFailure({ error })))
                )
            )
        )
    );
}