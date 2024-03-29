import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Apprentice } from '../models/api-models/Apprentice/apprentice.model';
import { ApprenticeService } from '../services/apprentices/apprentice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apprentices',
  templateUrl: './apprentices.component.html',
  styleUrls: ['./apprentices.component.css']
})
export class ApprenticesComponent implements OnInit {
  apprentices: Apprentice[] = []
  displayedColumns: string[] = ['id', 'name', 'surname', 'city', 'country',
  'clubCardId', 'role', 'danceGroup', 'createdBy', 'createdOn', 'modifiedBy', 'modifiedOn',
  'edit', 'delete'];
  dataSource = new MatTableDataSource<Apprentice>(this.apprentices);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private apprenticeService: ApprenticeService,
    private snackbar: MatSnackBar)
    {}

  ngOnInit(): void {
    //Fetch Lessons
    this.apprenticeService.postBrowseApprentices()
    .subscribe(
        (successResponse) => {
          this.apprentices = successResponse;
          this.dataSource = new MatTableDataSource<Apprentice>(this.apprentices);

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

  onDelete(apprenticeId: string):void {
    this.apprenticeService.deleteApprentice(apprenticeId)
      .subscribe(
        (successResponse) => {
          console.log(successResponse);
          setTimeout(() => {window.location.reload();}, 2000);
          this.snackbar.open('Apprentice successfully deleted', undefined, {duration: 2000});
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      )
    }
}
