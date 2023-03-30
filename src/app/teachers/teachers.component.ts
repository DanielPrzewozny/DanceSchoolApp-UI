import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Teacher } from '../models/ui-models/Teacher/teacher.model';
import { TeacherService } from '../services/teacher/teacher.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = []
  displayedColumns: string[] = ['id', 'name', 'surname', 'city', 'country', 'clubCardId', 'role', 'danceGroup',
  'createdBy', 'createdOn', 'modifiedBy', 'modifiedOn',
  'edit', 'delete'];
  dataSource = new MatTableDataSource<Teacher>(this.teachers);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private teacherService: TeacherService,
    private snackbar: MatSnackBar){}

  ngOnInit(): void {
    //Fetch Lessons
    this.teacherService.postBrowseTeachers()
    .subscribe(
        (successResponse) => {
          this.teachers = successResponse;
          this.dataSource = new MatTableDataSource<Teacher>(this.teachers);

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

  onDelete(teacherId: string):void {
    this.teacherService.deleteTeacher(teacherId)
      .subscribe(
        (successResponse) => {
          console.log(successResponse);
          setTimeout(() => {window.location.reload();}, 2000);
          this.snackbar.open('Teacher successfully deleted', undefined, {duration: 2000});
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      )
    }
}
