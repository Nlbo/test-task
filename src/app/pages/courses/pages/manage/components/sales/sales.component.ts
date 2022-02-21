import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { DurationUnit } from '../../../../../../models/duration-unit.enum';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Author } from '../../../../../../models/author.model';
import { debounceTime } from 'rxjs/operators';
import { DateRange } from '../../../../../../models/data-range.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: [ './sales.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SalesComponent),
      multi: true
    }
  ]
})
export class SalesComponent implements OnInit, OnDestroy, ControlValueAccessor {

  formGroup: FormGroup = new FormGroup({
    start: new FormControl(formatDate(new Date(),'yyyy-MM-dd','en'), [ Validators.required ]),
    end: new FormControl(formatDate(new Date(),'yyyy-MM-dd','en'), [ Validators.required ]),
  });
  subscribe: Subscription | undefined;
  isDisabled: boolean = false;
  onTouched: any;
  onChange: any;

  constructor() {
  }

  writeValue(value: DateRange): void {
    if (value && value.start && value.end) {
      this.formGroup.patchValue({
        start: formatDate(value.start,'yyyy-MM-dd','en'),
        end: formatDate(value.end,'yyyy-MM-dd','en')
      }, {emitEvent: false});
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
    this.formGroup.valueChanges.subscribe(() => {
      if (this.onChange) this.onChange({
        start: new Date(this.formGroup.get('start')?.value),
        end: new Date(this.formGroup.get('end')?.value)
      })
    })
  }

  ngOnDestroy(): void {
    this.subscribe?.unsubscribe();
  }


}
