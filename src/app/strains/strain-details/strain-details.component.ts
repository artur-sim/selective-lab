import { Component, OnInit,OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { strainActions, strainSelectors } from 'src/app/root-store';
import { StrainSummary } from '../../shared/models/strains/strain-summary.model';
import { takeWhile } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-strain-details',
  templateUrl: './strain-details.component.html',
  styleUrls: ['./strain-details.component.scss']
})
export class StrainDetailsComponent implements OnInit, OnDestroy {

  strainForm: FormGroup;
  isLoading: false;
  currentStrain: StrainSummary | null;

  componentActive = true;

  constructor(
    private store: Store<{}>,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.strainForm = this.fb.group({
      name: [{ value: '', disabled: true}, Validators.required],
      description: [{ value: '', disabled: true}, Validators.required]
    });

    this.route.paramMap.pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(strainActions.StrainDetailsActions.loadStrain({ id }));
      }
    });

    this.store.select(strainSelectors.selectCurrentStrain).pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(currentStrain => this.displayStrain(currentStrain));

  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  hasError(controlName: string, errorName: string) {
    return this.strainForm.controls[controlName].hasError(errorName);
  }

  displayStrain(strain: StrainSummary | null) {

    this.isLoading = false;
    this.currentStrain = strain;

    if (this.currentStrain && this.strainForm) {

      this.strainForm.reset();

      this.strainForm.patchValue({
        name: this.currentStrain.name,
        description: this.currentStrain.description
      });
    }
  }

  save() {

  }

  cancel() {

    this.displayStrain(this.currentStrain);
  }


}

