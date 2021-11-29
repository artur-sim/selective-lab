import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, of } from "rxjs";
import { catchError, exhaustMap, map, switchMap } from "rxjs/operators";
import { DeviceService } from "src/app/devices/device.service";
import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { deviceActions } from "../actions";

@Injectable()
export class DeviceDetailsEffects {

    constructor(
        private action$: Actions,
        private deviceService: DeviceService,
        private dialogService: MatDialog
    ) {}

    $loadDevice = createEffect(() =>
        this.action$.pipe(
            ofType(deviceActions.DeviceDetailsActions.loadDevice),
            switchMap(action =>
                this.deviceService.getDevice(action.id).pipe(
                    map(device => deviceActions.DeviceDetailsActions.loadDeviceSuccess({ device })),
                    catchError(error => of(deviceActions.DeviceDetailsActions.loadDeviceFailure({ error })))
                )
            )
        )
    );

    $loadDeviceMeasurements = createEffect(() =>
        this.action$.pipe(
            ofType(deviceActions.DeviceDetailsActions.loadDevice),
            switchMap(action =>
                this.deviceService.getDeviceMeasurements(action.id).pipe(
                    map(measurements => deviceActions.DeviceDetailsActions.loadDeviceMeasurementsSuccess({ measurements })),
                    catchError(error => of(deviceActions.DeviceDetailsActions.loadDeviceMeasurementsFailure({ error })))
                )
            )
        )
    );

    $updateDevice = createEffect(() =>
        this.action$.pipe(
            ofType(deviceActions.DeviceDetailsActions.updateDevice),
            switchMap(action =>
                this.deviceService.updateDevice(action.device).pipe(
                    map(device => deviceActions.DeviceDetailsActions.updateDeviceSuccess({ device })),
                    catchError(error => of(deviceActions.DeviceDetailsActions.updateDeviceFailure({ error })))
                )
            )
        )
    );

    $inactivateDevice = createEffect(() =>
        this.action$.pipe(
            ofType(deviceActions.DeviceDetailsActions.inactivateDevice),
            exhaustMap(action =>

                this.dialogService
                    .open(ConfirmDialogComponent, {
                        data: {
                            title: 'Inactivate Device',
                            body: 'Are you sure you want to deactivate this device?',
                            yesText: 'Yes',
                            noText: 'No'
                        }
                    })
                    .afterClosed()
                    .pipe(
                        switchMap(confirmed => 
                            this.deviceService.inactivateDevice(action.deviceId).pipe(
                                map(device => deviceActions.DeviceDetailsActions.inactivateDeviceSuccess({ device })),
                                catchError(error => of(deviceActions.DeviceDetailsActions.inactivateDeviceFailure({ error })))
                            )
                        )
                    )
            )
        )
    );

    $activateDevice = createEffect(() =>
        this.action$.pipe(
            ofType(deviceActions.DeviceDetailsActions.activateDevice),
            exhaustMap(action =>

                this.dialogService
                    .open(ConfirmDialogComponent, {
                        data: {
                            title: 'Activate Device',
                            body: 'Are you sure you want to reactivate this device?',
                            yesText: 'Yes',
                            noText: 'No'
                        }
                    })
                    .afterClosed()
                    .pipe(
                        switchMap(confirmed => 
                            this.deviceService.activateDevice(action.deviceId).pipe(
                                map(device => deviceActions.DeviceDetailsActions.activateDeviceSuccess({ device })),
                                catchError(error => of(deviceActions.DeviceDetailsActions.activateDeviceFailure({ error })))
                            )
                        )
                    )
            )
        )
    );

    
}