import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprenticesComponent } from './apprentices/apprentices.component';
import { ViewApprenticesComponent } from './apprentices/view-apprentices/view-apprentices/view-apprentices.component';
import { ClubCardsComponent } from './club-cards/club-cards.component';
import { ViewClubCardsComponent } from './club-cards/view-club-cards/view-club-cards/view-club-cards.component';
import { ControlPanelComponent } from './layout/control-panel/control-panel.component';
import { MainInfoComponent } from './layout/main-info/main-info.component';
import { LessonsComponent } from './lessons/lessons.component';
import { ViewLessonsComponent } from './lessons/view-lessons/view-lessons.component';
import { TeachersComponent } from './teachers/teachers.component';
import { ViewTeachersComponent } from './teachers/view-teachers/view-teachers/view-teachers.component';

const routes: Routes = [
  {
    path: 'control-panel',
    component: ControlPanelComponent,
    children: [
      {
        path: 'apprentices',
        component: ApprenticesComponent
      },
      {
        path: 'apprentices/:id',
        component: ViewApprenticesComponent
      },
      {
        path: 'club-cards',
        component: ClubCardsComponent
      },
      {
        path: 'club-cards/:id',
        component: ViewClubCardsComponent
      },
      {
        path: 'teachers',
        component: TeachersComponent
      },
      {
        path: 'teachers/:id',
        component: ViewTeachersComponent
      },
      {
        path: 'lessons',
        component: LessonsComponent
      },
      {
        path: 'lessons/:id',
        component: ViewLessonsComponent
      },
    ]
  },

  {
    path: '',
    component: MainInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
