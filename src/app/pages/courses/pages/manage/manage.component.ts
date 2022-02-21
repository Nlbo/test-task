import { Component, OnInit } from '@angular/core';
import { ManageModel } from './manage.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ManageTypeEnum } from '../../../../enums/manage-type.enum';
import { DataService } from '../../../../services/data/data.service';
import { debounceTime, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  manageModel = new ManageModel();
  id: string = '';
  mode: ManageTypeEnum = ManageTypeEnum.ADD;
  ManageTypeEnum = ManageTypeEnum;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.type) {
        switch (params.type as ManageTypeEnum) {
          case ManageTypeEnum.EDIT:
            if (params.id) this.id = params.id;
            this.mode = ManageTypeEnum.EDIT;
            this.getCourseAndPatchValue();
            break;
          case ManageTypeEnum.PREVIEW:
            if (params.id) this.id = params.id;
            this.mode = ManageTypeEnum.EDIT;
            this.getCourseAndPatchValue();
            this.manageModel.disableAllFields();
        }
      }
    })
  }

  getCourseAndPatchValue(): void {
    this.dataService.courses$.pipe(take(1)).subscribe(courses => {
      let course = courses.find(course => course.id === this.id)
      if (course) {
        this.manageModel.formGroup.patchValue(course, {emitEvent: false});
        this.manageModel.formGroup.valueChanges.pipe(debounceTime(300)).subscribe((data) => {
          this.dataService.updateCourse(this.id, this.manageModel.getValue());
        })
      } else {
        this.router.navigate([''])
      }
    })
  }

  save() {
      this.dataService.createCourse(this.manageModel.getValue()).then(e => this.router.navigate(['']));
  }

}
