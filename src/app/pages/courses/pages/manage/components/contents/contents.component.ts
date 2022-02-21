import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ContentsItem } from '../../../../../../models/contents-item.model';
import { ContentsItemType } from '../../../../../../models/contents-item-type.enum';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: [ './contents.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContentsComponent),
      multi: true
    }
  ]
})
export class ContentsComponent implements OnInit, OnDestroy, ControlValueAccessor {

  formGroups: FormGroup[] = [];
  subscribes: Subscription[] = [];
  isDisabled: boolean = false;
  ContentsItemType = ContentsItemType;
  onTouched: any;
  onChange: any;

  constructor() {
  }

  writeValue(value: ContentsItem[]): void {
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

  createNewFormGroup(value?: ContentsItem): void {
    let newForm = new FormGroup({
      name: new FormControl('', [ Validators.required ]),
      type: new FormControl(ContentsItemType.stream, [ Validators.required ])
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
