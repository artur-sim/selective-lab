import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { strainActions, strainSelectors } from 'src/app/root-store';
import { takeWhile } from "rxjs/operators"
import { StrainSummary } from '../../shared/models/strains/strain-summary.model';


@Component({
  selector: 'app-add-edit-strain',
  templateUrl: './add-edit-strain.component.html',
  styleUrls: ['./add-edit-strain.component.scss']
})
export class AddEditStrainComponent implements OnInit, OnDestroy {
  @Output() closeModal = new EventEmitter<boolean>();
  close() {
    this.closeModal.emit();
  }

  strainForm: FormGroup;
  isLoading = false;
  componentActive = true;
  currentStrainId : number | null;

  constructor(
    private fb: FormBuilder,
    private store: Store<{}>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.strainForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.route.paramMap.pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(strainActions.StrainEditActions.loadStrain({ id }));

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

  save() {
    this.isLoading = true;
    if (this.strainForm.valid) {

      let strain = { ...this.strainForm.value };
      if (this.currentStrainId) {
        strain.id == this.currentStrainId;
      }
      this.store.dispatch((strain.id) ? strainActions.StrainEditActions.editStrain({ strain }) : strainActions.StrainAddActions.addStrain({ strain }));

    }
  }

  displayStrain(strain: StrainSummary | null) {
    if (strain !== null) {
      console.log('strain' + strain);
      this.currentStrainId = strain?.id || null;
      this.strainForm.setValue({ name: strain!.name, description: strain!.description });
    }
  }

  cancel() {
    if (this.currentStrainId) {
      this.store.dispatch(strainActions.StrainEditActions.cancelEditStrain());
    }
    else {
      this.store.dispatch(strainActions.StrainAddActions.cancelAddStrain());
    }
  }

}
