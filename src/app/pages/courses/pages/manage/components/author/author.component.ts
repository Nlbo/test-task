import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Author } from '../../../../../../models/author.model';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: [ './author.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorComponent),
      multi: true
    }
  ]
})
export class AuthorComponent implements OnInit, OnDestroy, ControlValueAccessor {

  formGroup: FormGroup = new FormGroup({
    firstName: new FormControl('', [ Validators.required ]),
    lastName: new FormControl('', [ Validators.required ]),
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
