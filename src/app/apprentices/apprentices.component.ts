import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Apprentice } from '../models/api-models/apprentice.model';
import { ApprenticeService } from './apprentice.service';

@Component({
  selector: 'app-apprentices',
  templateUrl: './apprentices.component.html',
  styleUrls: ['./apprentices.component.css']
})
export class ApprenticesComponent implements OnInit {
  teachers: Apprentice[] = []
  displayedColumns: string[] = ['id', 'name', 'surname', 'city', 'country', 'clubCardId', 'role', 'danceGroup', 'createdBy', 'createdOn', 'modifiedBy', 'modifiedOn'];
  dataSource = new MatTableDataSource<Apprentice>(this.teachers);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private teacherService: ApprenticeService){}

  ngOnInit(): void {
    //Fetch Lessons
    this.teacherService.postBrowseApprentices()
    .subscribe(
        (successResponse) => {
          this.teachers = successResponse;
          this.dataSource = new MatTableDataSource<Apprentice>(this.teachers);

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
