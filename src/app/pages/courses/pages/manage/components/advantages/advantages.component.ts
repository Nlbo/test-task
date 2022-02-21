import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PlanAdvantage } from '../../../../../../models/plan-advantage.model';

@Component({
  selector: 'app-advantages',
  templateUrl: './advantages.component.html',
  styleUrls: [ './advantages.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdvantagesComponent),
      multi: true
    }
  ]
})
export class AdvantagesComponent implements OnInit, OnDestroy, ControlValueAccessor {

  formGroups: FormGroup[] = [];
  subscribes: Subscription[] = [];
  isDisabled: boolean = false;
  onTouched: any;
  onChange: any;

  constructor() {
  }

  writeValue(value: PlanAdvantage[]): void {
    if (value?.length) {
      value.forEach(item => this.createNewFormGroup(item))
    }
  }

  registerOnChange(fn: any): void {
    if (fn) this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    if (fn) this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {
  }

  createNewFormGroup(value?: PlanAdvantage): void {
    let newForm = new FormGroup({
      available: new FormControl(false),
      title: new FormControl('', [ Validators.required ])
    })
    if (value) newForm.patchValue(value, {emitEvent: false});
    this.subscribes.push(newForm.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      if (this.onChange) {
        this.onChange(this.formGroups.map(form => form.value));
      }
    }))
    this.formGroups.push(newForm)
  }

  ngOnDestroy(): void {
    this.subscribes.forEach(sub => sub.unsubscribe())
  }

}
