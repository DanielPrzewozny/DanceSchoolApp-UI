import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../lesson.service';
import { NgForm } from '@angular/forms';
import { Lesson } from 'src/app/models/ui-models/lesson.model';

@Component({
  selector: 'app-view-lessons',
  templateUrl: './view-lessons.component.html',
  styleUrls: ['./view-lessons.component.css']
})
export class ViewLessonsComponent implements OnInit {
  lessonId: string | null | undefined;
  lesson: Lesson = {
    id: 0,
    name: '',
    danceGroup: '',
    teacherId: 0,
    timeEst: '',
    description: '',
    everySpecificDayOfWeek: '',
    createdBy: '',
    createdOn: '',
    modifiedBy: '',
    modifiedOn: ''
  };

  constructor(private readonly lessonService: LessonService,
    private readonly route: ActivatedRoute){
    }

  ngOnInit(): void {
    //Fetch Lessons
    this.route.paramMap.subscribe(
      (params) => {
        this.lessonId = params.get('id');
        if(this.lessonId){
          this.lessonService.getLesson(this.lessonId)
          .subscribe(
            (successResponse) => {
             console.log(successResponse);
             this.lesson = successResponse;
            },
            (errorResponse) => {
              console.log(errorResponse);
            }
          )
        }
      }
    )
  }
}
