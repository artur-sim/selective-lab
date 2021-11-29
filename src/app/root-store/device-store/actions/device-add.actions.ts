import { createAction, props } from "@ngrx/store";
import { DeviceSummary } from "src/app/shared/models/device/device-summary.model";
import { Registration } from "src/app/shared/models/device/registration.model";

export const registerDevice = createAction(
    '[Add Device Component] Register Device',
    props<{ registration: Registration }>()
);

export const registerDeviceSuccess = createAction(
    '[Device API] Register Device Success',
    props<{ device: DeviceSummary }>()
);

export const registerDeviceFailure = createAction(
    '[Device API] Register Device Failure',
    props<{ error: any }>()
);

export const redirectToNewDevice = createAction(
    '[Device API] Redirect To New Device'
);