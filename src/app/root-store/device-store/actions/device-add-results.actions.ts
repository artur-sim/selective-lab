import { createAction, props } from "@ngrx/store";
import { DeviceMeasurementRecord } from "src/app/shared/models/device/device-measurement-record.model";
import { DeviceMeasurement } from "src/app/shared/models/device/device-measurement.model";

export const recordMeasurement = createAction(
    '[Device Add Results Component] Record Measurement',
    props<{ measurement: DeviceMeasurementRecord }>()
);

export const recordMeasurementSuccess = createAction(
    '[Device API] Record Measurement Success',
    props<{ measurement: DeviceMeasurement }>()
);

export const recordMeasurementFailure = createAction(
    '[Device API] Record Measurement Failure',
    props<{ error: any }>()
);

export const redirectToDeviceRecord = createAction(
    '[Device API] Redirect To Record Device'
);