import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  homeSubmenuExpanded = true;
  deviceSubmenuExpanded = false;
  strainsSubmenuExpanded = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  showHome() {
    this.deviceSubmenuExpanded = false;
    this.strainsSubmenuExpanded = false;
    this.homeSubmenuExpanded = true;
    this.router.navigate(['/dashboard']);
  }

  hideHome(){
    this.homeSubmenuExpanded = false;
  }

  showDeviceSubmenu() {
    this.deviceSubmenuExpanded = true;
    this.strainsSubmenuExpanded = false;
    this.homeSubmenuExpanded = false;
    this.router.navigate(['/dashboard/devices']);
  }

  showStrainsSubmenu() {

    this.strainsSubmenuExpanded = true;
    this.deviceSubmenuExpanded = false;
    this.homeSubmenuExpanded = false;

    this.router.navigate(['/dashboard/strains']);
  }

}
