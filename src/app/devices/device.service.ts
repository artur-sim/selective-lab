import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeviceSummary } from 'src/app/shared/models/device/device-summary.model';
import { Registration } from 'src/app/shared/models/device/registration.model';
import { DeviceMeasurementRecord } from '../shared/models/device/device-measurement-record.model';
import { DeviceMeasurement } from '../shared/models/device/device-measurement.model';
import { DeviceUpdate } from '../shared/models/device/device-update.model';
import { StrainListItem } from '../shared/models/strains/strain-list-item';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  baseUrl = `${environment.apiUrl}/devices`;

  constructor(
    private http: HttpClient
  ) { }

  getDevices(): Observable<DeviceSummary[]> {
    
    const url = `${this.baseUrl}`;

    return this.http.get<DeviceSummary[]>(url);
  }

  getDevice(id: string): Observable<DeviceSummary> {

    const url = `${this.baseUrl}/${id}`;

    return this.http.get<DeviceSummary>(url);
  }

  getMeasurementStrainList(measurementId: number | null = null): Observable<StrainListItem[]> {

    let url = `${this.baseUrl}/measurements`;

    url = measurementId ? `${url}/${measurementId}/available-strains` : `${url}/available-strains`;

    return this.http.get<StrainListItem[]>(url);
  }

  registerDevice(registration: Registration): Observable<DeviceSummary> {

    const url = `${this.baseUrl}/register`;

    return this.http.post<DeviceSummary>(url, registration);
  }

  recordMeasurement(deviceMeasurement: DeviceMeasurementRecord): Observable<DeviceMeasurement> {

    const url = `${this.baseUrl}/${deviceMeasurement.deviceId}/measurements`;

    return this.http.post<DeviceMeasurement>(url, deviceMeasurement);
  }

  getDeviceMeasurements(id: string): Observable<DeviceMeasurement[]> {
     const url = `${this.baseUrl}/${id}/measurements`;

     return this.http.get<DeviceMeasurement[]>(url);
  }

  updateDevice(device: DeviceUpdate): Observable<DeviceSummary> {
    const url = `${this.baseUrl}/${device.id}`;

    return this.http.put<DeviceSummary>(url, device);
  }

  inactivateDevice(id: string): Observable<DeviceSummary> {
    const url = `${this.baseUrl}/${id}/inactivate`;

    return this.http.put<DeviceSummary>(url, {});
  }

  activateDevice(id: string): Observable<DeviceSummary> {
    const url = `${this.baseUrl}/${id}/reactivate`;

    return this.http.put<DeviceSummary>(url, {});
  }
}
