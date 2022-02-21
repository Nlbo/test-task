import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { ManageComponent } from './pages/manage/manage.component';
import { ListComponent } from './pages/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlansComponent } from './pages/manage/components/plans/plans.component';
import { AdvantagesComponent } from './pages/manage/components/advantages/advantages.component';
import { ContentsComponent } from './pages/manage/components/contents/contents.component';
import { AuthorComponent } from './pages/manage/components/author/author.component';
import { SalesComponent } from './pages/manage/components/sales/sales.component';
import { DurationComponent } from './pages/manage/components/duration/duration.component';


@NgModule({
  declarations: [
    CoursesComponent,
    ManageComponent,
    ListComponent,
    PlansComponent,
    AdvantagesComponent,
    ContentsComponent,
    AuthorComponent,
    SalesComponent,
    DurationComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CoursesModule { }
