import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubCardsComponent } from './club-cards/club-cards.component';
import { LessonsComponent } from './lessons/lessons.component';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';

const routes: Routes = [
  {
    path: 'students',
    component: StudentsComponent
  },
  {
    path: 'club-cards',
    component: ClubCardsComponent
  },
  {
    path: 'teachers',
    component: TeachersComponent
  },
  {
    path: 'lessons',
    component: LessonsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
