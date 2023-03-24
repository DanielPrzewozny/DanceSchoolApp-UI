import { Component, OnInit, ViewChild } from '@angular/core';
import { Lesson } from '../models/ui-models/lesson.model';
import { LessonService } from './lesson.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  lessons: Lesson[] = [];
  displayedColumns: string[] = ['id', 'danceGroup', 'name', 'teacherId', 'timeEst','description', 'everySpecificDayOfWeek', 'createdBy','createdOn', 'modifiedBy', 'modifiedOn','edit'];
  dataSource = new MatTableDataSource<Lesson>(this.lessons);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private lessonsService: LessonService){}

  ngOnInit(): void {
    //Fetch Lessons
    this.lessonsService.postBrowseLesson()
    .subscribe(
        (successResponse) => {
          this.lessons = successResponse;
          this.dataSource = new MatTableDataSource<Lesson>(this.lessons);

          if(this.paginator){
            this.dataSource.paginator = this.paginator;
          }
          if(this.matSort){
            this.dataSource.sort = this.matSort;
          }
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      )
  }
}
