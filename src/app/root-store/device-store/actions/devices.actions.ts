import { createAction, props } from "@ngrx/store";
import { DeviceSummary } from 'src/app/shared/models/device/device-summary.model';

export const getDevices = createAction(
    '[Devices Component] Get Devices'
);

export const getDevicesSuccess = createAction(
    '[Devices API] Get Devices Success',
    props<{ devices: DeviceSummary[] }>()
);

export const getDevicesFailure = createAction(
    '[Devices API] Get Devices Failure',
    props<{ error: any }>()
);