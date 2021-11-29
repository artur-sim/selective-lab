import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { DeviceService } from "src/app/devices/device.service";
import { deviceActions } from '../actions';

@Injectable()
export class DevicesEffects {

    constructor(
        private actions$: Actions,
        private deviceService: DeviceService
    ) {}

    loadDevices$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deviceActions.DevicesActions.getDevices),
            switchMap(action =>
                this.deviceService.getDevices().pipe(
                    map(devices => deviceActions.DevicesActions.getDevicesSuccess({ devices })),
                    catchError(error => of(deviceActions.DevicesActions.getDevicesFailure({ error })))
                )
            )
        )
    );
}