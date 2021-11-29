import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { strainActions, strainSelectors } from 'src/app/root-store';
import { StrainSummary } from '../shared/models/strains/strain-summary.model';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-strains',
  templateUrl: './strains.component.html',
  styleUrls: ['./strains.component.scss']
})
export class StrainsComponent implements OnInit {

  // strains$: Observable<StrainSummary[]>;
  displayedColumns: string[] = ["name", "description"];
  strains$ = [
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
  modal: boolean
  constructor(
    private store: Store<{}>,
    private route: Router
  ) { }

  ngOnInit(): void {

    this.store.dispatch(strainActions.StrainsActions.getStrains());

    // this.strains$ = this.store.select(strainSelectors.selectStrains);
  }
  selectStrain(strainId: number) {

    this.route.navigate([`/dashboard/strains/${strainId}`]);
  }


  deleteStrain(strainId: number) {
    this.store.dispatch(strainActions.StrainDeleteActions.deleteStrain({ strainId }));
  }
  editStrain(strainId: number) {
    this.route.navigate([`/dashboard/strains/add-edit/${strainId}`]);
  }

  addStrain() {
    this.modal = true
  }
}
