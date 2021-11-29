import { Action, createReducer, on } from "@ngrx/store";
import { DeviceMeasurement } from "src/app/shared/models/device/device-measurement.model";
import { DeviceSummary } from "src/app/shared/models/device/device-summary.model";
import { deviceActions } from "./actions";

export const deviceFeatureKey = 'device';

export interface DeviceState {
    devices: DeviceSummary[];
    currentDevice: DeviceSummary | null;
    error: string;
    currentDeviceMeasurements: DeviceMeasurement[];
};

export const initialState: DeviceState = {
    devices: [],
    currentDevice: null,
    error: '',
    currentDeviceMeasurements: []
};

const devicesReducer = createReducer(
    initialState,
    on(deviceActions.DeviceDetailsActions.loadDevice, (state, action) => (
        {
            ...state,
            currentDevice: null,
            currentDeviceMeasurements: [],
            error: ''
        }
    )),
    on(deviceActions.DevicesActions.getDevicesSuccess, (state, action) => (
        {
            ...state,
            devices: action.devices,
            error: ''
        }
    )),
    on(deviceActions.DeviceDetailsActions.loadDeviceSuccess,
       deviceActions.DeviceDetailsActions.updateDeviceSuccess,
       deviceActions.DeviceDetailsActions.inactivateDeviceSuccess,
       deviceActions.DeviceDetailsActions.activateDeviceSuccess, (state, action) => (
        {
            ...state,
            currentDevice: action.device,
            error: ''
        }
    )),
    on(deviceActions.DeviceDetailsActions.loadDeviceMeasurementsSuccess, (state, action) => (
        {
            ...state,
            currentDeviceMeasurements: action.measurements,
            error: ''
        }
    )),
    on(deviceActions.DeviceAddActions.registerDeviceSuccess, (state, action) => (
        {
            ...state,
            devices: [ ...state.devices, action.device],
            error: ''
        }
    )),
    on(deviceActions.DeviceAddResultsActions.recordMeasurementSuccess, (state, action) => (
        {
            ...state,
            currentDeviceMeasurements: [ ...state.currentDeviceMeasurements, action.measurement],
            error: ''
        }
    )),
    on(deviceActions.DevicesActions.getDevicesFailure,
       deviceActions.DeviceDetailsActions.loadDeviceFailure,
       deviceActions.DeviceAddActions.registerDeviceFailure,
       deviceActions.DeviceAddResultsActions.recordMeasurementFailure,
       deviceActions.DeviceDetailsActions.loadDeviceMeasurementsFailure,
       deviceActions.DeviceDetailsActions.updateDeviceFailure,
       deviceActions.DeviceDetailsActions.inactivateDeviceFailure,
       deviceActions.DeviceDetailsActions.activateDeviceFailure, (state, action) => (
        {
            ...state,
            error: action.error
        }
    ))
);

export function reducer(state: DeviceState | undefined, action: Action) {
    return devicesReducer(state, action);
};