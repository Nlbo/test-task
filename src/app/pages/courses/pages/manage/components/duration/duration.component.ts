import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { DurationUnit } from '../../../../../../models/duration-unit.enum';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Author } from '../../../../../../models/author.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: [ './duration.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationComponent),
      multi: true
    }
  ]
})
export class DurationComponent implements OnInit, OnDestroy, ControlValueAccessor {
  DurationUnit = DurationUnit;

  formGroup: FormGroup = new FormGroup({
    value: new FormControl('', [ Validators.required ]),
    unit: new FormControl(DurationUnit.day, [ Validators.required ]),
  });
  subscribe: Subscription | undefined;
  isDisabled: boolean = false;
  onTouched: any;
  onChange: any;

  constructor() {
  }

  writeValue(value: Author): void {
    if (value) {
      this.formGroup.patchValue(value, {emitEvent: false});
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
    this.formGroup.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      if (this.onChange) this.onChange(this.formGroup.value)
    })
  }

  ngOnDestroy(): void {
    this.subscribe?.unsubscribe();
  }


}
