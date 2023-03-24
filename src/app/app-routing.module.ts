import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprenticesComponent } from './apprentices/apprentices.component';
import { ClubCardsComponent } from './club-cards/club-cards.component';
import { LessonsComponent } from './lessons/lessons.component';
import { ViewLessonsComponent } from './lessons/view-lessons/view-lessons.component';
import { TeachersComponent } from './teachers/teachers.component';

const routes: Routes = [
  {
    path: 'apprentices',
    component: ApprenticesComponent
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
  },
  {
    path: 'lessons/:id',
    component: ViewLessonsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
