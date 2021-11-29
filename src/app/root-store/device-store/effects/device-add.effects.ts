import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { DeviceService } from "src/app/devices/device.service";
import { deviceActions } from "../actions";

@Injectable()
export class DeviceAddEffects {

    constructor(
        private actions$: Actions,
        private deviceService: DeviceService,
        private router: Router
    ) {}

    registerDevice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deviceActions.DeviceAddActions.registerDevice),
            switchMap(action => 
                this.deviceService.registerDevice(action.registration).pipe(
                    map(device => deviceActions.DeviceAddActions.registerDeviceSuccess({ device })),
                    catchError(error => of(deviceActions.DeviceAddActions.registerDeviceFailure({ error })))
                )
            )
        )
    );

    redirectToNewDevice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deviceActions.DeviceAddActions.registerDeviceSuccess),
            tap((action) => this.router.navigate([`/dashboard/devices/${action.device.id}`]))
        ), { dispatch: false})
} 