import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ClubCard } from '../models/ui-models/ClubCards/club-card.model';
import { ClubCardService } from '../services/club-cards/club-card.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-club-cards',
  templateUrl: './club-cards.component.html',
  styleUrls: ['./club-cards.component.css']
})
export class ClubCardsComponent {
  clubCards: ClubCard[] = [];
  displayedColumns: string[] = ['id', 'userId', 'danceGroup', 'validFromDate', 'expirationDate',
  'createdBy', 'createdOn', 'modifiedBy', 'modifiedOn',
  'edit', 'delete'];
  dataSource = new MatTableDataSource<ClubCard>(this.clubCards);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(private clubCardService: ClubCardService,
    private snackbar: MatSnackBar){}

  ngOnInit(): void {
    //Fetch ClubCards
    this.clubCardService.postBrowseClubCards()
    .subscribe(
        (successResponse) => {
          this.clubCards = successResponse;
          this.dataSource = new MatTableDataSource<ClubCard>(this.clubCards);

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

  onDelete(clubCardId: string):void {
    this.clubCardService.deleteClubCard(clubCardId)
      .subscribe(
        (successResponse) => {
          console.log(successResponse);
          setTimeout(() => {window.location.reload();}, 2000);
          this.snackbar.open('ClubCard successfully deleted', undefined, {duration: 2000});
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      )
    }
}
