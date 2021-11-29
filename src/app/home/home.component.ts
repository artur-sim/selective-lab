import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  deviceListClick() {
    this.route.navigate(['/dashboard/devices']);
  }

  addDeviceClick() {
    this.route.navigate(['/dashboard/devices/add']);
  }

  testResultsClick() {
    this.route.navigate(['/dashboard/test-results']);
  }

}
