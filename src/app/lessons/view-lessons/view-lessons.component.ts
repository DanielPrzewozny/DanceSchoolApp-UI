import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Lesson } from 'src/app/models/ui-models/lesson.model';
import { LessonService } from 'src/app/services/lessons/lesson.service';
import { UpdateLessonRequest } from 'src/app/models/api-models/update-lesson-request';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  isNewLesson: boolean = true;
  header='';

  constructor(private readonly lessonService: LessonService,
    private readonly route: ActivatedRoute, private snackbar: MatSnackBar,
    private readonly router: Router){
    }

  ngOnInit(): void {
    //Fetch Lessons
    this.route.paramMap.subscribe(
      (params) => {
        this.lessonId = params.get('id');
        if(this.lessonId)
        {
            if(this.lessonId.toLowerCase() === 'Add'.toLowerCase())
            {
              this.isNewLesson = true;
              this.header = 'Add New Lesson'
            }
            else
            {
              this.isNewLesson = false;
              this.header = 'Edit Lesson'
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
      }
    )
  }

  onUpdate():void {
    this.lessonService.updateLesson(this.lesson)
      .subscribe(
        (successResponse) => {
          console.log(successResponse);
          this.snackbar.open('Lesson updated successfully', undefined, {duration: 2000});
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      )
    }

    onCreate():void {
      this.lessonService.createLesson(this.lesson)
        .subscribe(
          (successResponse) => {
            console.log(successResponse);
            this.snackbar.open('Lesson created successfully', undefined, {duration: 2000});
            setTimeout(() => {
                this.router.navigateByUrl(`lessons/${successResponse}`);
            }, 2000);
          },
          (errorResponse) => {
            console.log(errorResponse);
          }
        )
      }
}
