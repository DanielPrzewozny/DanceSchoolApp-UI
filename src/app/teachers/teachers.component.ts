import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Teacher } from '../models/ui-models/teacher.model';
import { TeacherService } from './teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = []
  displayedColumns: string[] = ['id', 'name', 'surname', 'city', 'country', 'clubCardId', 'role', 'danceGroup', 'createdBy', 'createdOn', 'modifiedBy', 'modifiedOn'];
  dataSource = new MatTableDataSource<Teacher>(this.teachers);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private teacherService: TeacherService){}

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
}
