import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data/data.service';
import { ManageTypeEnum } from '../../../../enums/manage-type.enum';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [ './list.component.scss' ]
})
export class ListComponent implements OnInit {
  courses$ = this.dataService.courses$;
  ManageTypeEnum = ManageTypeEnum;

  constructor(
    private readonly dataService: DataService
  ) {
  }

  ngOnInit(): void {}

}
