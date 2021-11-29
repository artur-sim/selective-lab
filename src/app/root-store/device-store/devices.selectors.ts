import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDevices from './devices.reducer';

export const getDevices = (state: fromDevices.DeviceState) => state.devices;
export const getError = (state: fromDevices.DeviceState) => state.error;
export const getCurrentDevice = (state: fromDevices.DeviceState) => state.currentDevice;
export const getCurrentDeviceMeasurements = (state: fromDevices.DeviceState) => state.currentDeviceMeasurements;

export const selectDevicesState = createFeatureSelector<fromDevices.DeviceState>(
    fromDevices.deviceFeatureKey
);

export const selectDevices = createSelector(
    selectDevicesState,
    getDevices
);

export const selectError = createSelector(
    selectDevicesState,
    getError
);

export const selectCurrentDevice = createSelector(
    selectDevicesState,
    getCurrentDevice
);

export const selectCurrentDeviceMeasurements = createSelector(
    selectDevicesState,
    getCurrentDeviceMeasurements
);