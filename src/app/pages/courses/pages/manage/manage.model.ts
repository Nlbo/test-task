import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../../../models/course.model';

export class ManageModel {
  id = new FormControl('');
  name = new FormControl('', [ Validators.required ]);
  description = new FormControl('', [ Validators.required ]);
  author = new FormControl('', [ Validators.required ]);
  contents = new FormControl([], [ Validators.required ]);
  plans = new FormControl([], [ Validators.required ]);
  duration = new FormControl(0, [ Validators.required ]);
  sales = new FormControl({start: new Date(), end: new Date()}, [ Validators.required ])

  formGroup = new FormGroup({
    name: this.name,
    description: this.name,
    author: this.author,
    contents: this.contents,
    plans: this.plans,
    duration: this.duration,
    sales: this.sales,
  })

  getValue(): Course {
    return this.formGroup.value;
  }

  disableAllFields(): void {
    this.name.disable()
    this.description.disable();
    this.author.disable();
    this.contents.disable();
    this.plans.disable();
    this.duration.disable();
    this.sales.disable();
  }
}
