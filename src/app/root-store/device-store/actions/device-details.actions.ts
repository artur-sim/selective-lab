import { createAction, props } from "@ngrx/store";
import { DeviceMeasurement } from "src/app/shared/models/device/device-measurement.model";
import { DeviceSummary } from "src/app/shared/models/device/device-summary.model";
import { DeviceUpdate } from "src/app/shared/models/device/device-update.model";

export const loadDevice = createAction(
    '[Device Details Component] Load Device',
    props<{ id: string }>()
);

export const loadDeviceSuccess = createAction(
    '[Device API] Load Device Success',
    props<{ device: DeviceSummary }>()
);

export const loadDeviceFailure = createAction(
    '[Device API] Load Device Failure',
    props<{ error: any }>()
);

export const loadDeviceMeasurements = createAction(
    '[Device Details Component] Load Device Measurements',
    props<{ id: string }>()
);

export const loadDeviceMeasurementsSuccess = createAction(
    '[Device API] Load Device Measurements Success',
    props<{ measurements: DeviceMeasurement[] }>()
);

export const loadDeviceMeasurementsFailure = createAction(
    '[Device API] Load Device Measurements Failure',
    props<{ error: any }>()
);

export const updateDevice = createAction(
    '[Device Details Component] Update Device',
    props<{ device: DeviceUpdate }>()
);

export const updateDeviceSuccess = createAction(
    '[Device API] Update Device Success',
    props<{ device: DeviceSummary }>()
);

export const updateDeviceFailure = createAction(
    '[Device API] Update Dedvice Failure',
    props<{ error: any }>()
);

export const inactivateDevice = createAction(
    '[Device Details Component] Inactivate Device',
    props<{ deviceId: string }>()
);

export const inactivateDeviceSuccess = createAction(
    '[Device API] Inactivate Device Success',
    props<{ device: DeviceSummary }>()
);

export const inactivateDeviceFailure = createAction(
    '[Device API] Inactivate Device Failure',
    props<{ error: any }>()
);

export const activateDevice = createAction(
    '[Device Details Component] Activate Device',
    props<{ deviceId: string }>()
);

export const activateDeviceSuccess = createAction(
    '[Device API] Activate Device Success',
    props<{ device: DeviceSummary }>()
);

export const activateDeviceFailure = createAction(
    '[Device API] Activate Device Failure',
    props<{ error: any }>()
);

