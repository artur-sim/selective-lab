import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { deviceActions, deviceSelectors } from 'src/app/root-store';
import { DeviceSummary } from '../shared/models/device/device-summary.model';
import {AddDeviceComponent} from "./add-device/add-device.component";


@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  // devices$: Observable<DeviceSummary[]>;
  devices$ = [
    {
      id: 'string',
      name: 'string',
      serialNumberLastFour: 'string',
      description: 'string',
      isActive: true,
    },
    {
      id: 'string',
      name: 'string',
      serialNumberLastFour: 'string',
      description: 'string',
      isActive: true,
    },
  ]
  //TODO: add 'archive' to show archive column
  displayColumns = ['name', 'serial-number', 'description'];
  modal: boolean
  constructor(
    private store: Store<{}>,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(deviceActions.DevicesActions.getDevices());

    // this.devices$ = this.store.select(deviceSelectors.selectDevices);
  }

  archiveDevice(device: DeviceSummary) {
    //console.log('device', device);
    //TODO: Emit archive device action which will ask for confirm dialog then issue delete action
  }

  selectDevice(device: DeviceSummary) {

    this.route.navigate([`/dashboard/devices/${device.id}`]);
  }

  addDevice() {
    this.modal = true
  }
}
