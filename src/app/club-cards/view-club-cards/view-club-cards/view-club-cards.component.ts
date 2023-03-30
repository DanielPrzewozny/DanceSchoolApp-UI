import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubCard } from 'src/app/models/ui-models/ClubCards/club-card.model';
import { ClubCardService } from 'src/app/services/club-cards/club-card.service';


@Component({
  selector: 'app-view-club-cards',
  templateUrl: './view-club-cards.component.html',
  styleUrls: ['./view-club-cards.component.css']
})
export class ViewClubCardsComponent implements OnInit {
  clubCardId: string | null | undefined;
  clubCard: ClubCard = {
      id: 0,
      userId: 0,
      danceGroup: '',
      validFromDate: '',
      expirationDate: '',
      createdBy: '',
      createdOn: '',
      modifiedBy: '',
      modifiedOn: ''
    };

  isNewClubCard: boolean = true;
  header='';

  constructor(private readonly clubCardService: ClubCardService,
    private readonly route: ActivatedRoute, private snackbar: MatSnackBar,
    private readonly router: Router){
    }

    ngOnInit(): void {
      //Fetch Lessons
      this.route.paramMap.subscribe(
        (params) => {
          this.clubCardId = params.get('id');
          if(this.clubCardId)
          {
              if(this.clubCardId.toLowerCase() === 'Add'.toLowerCase())
              {
                this.isNewClubCard = true;
                this.header = 'Add New ClubCard'
              }
              else
              {
                this.isNewClubCard = false;
                this.header = 'Edit ClubCard'
                this.clubCardService.getClubCard(this.clubCardId)
                .subscribe(
                  (successResponse) => {
                  console.log(successResponse);
                  this.clubCard = successResponse;
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
      this.clubCardService.updateClubCard(this.clubCard)
        .subscribe(
          (successResponse) => {
            console.log(successResponse);
            this.snackbar.open('ClubCard updated successfully', undefined, {duration: 2000});
            setTimeout(() => {
              this.router.navigateByUrl(`club-cards`);
            }, 2000);
          },
          (errorResponse) => {
            console.log(errorResponse);
          }
        )
      }

      onCreate():void {
        this.clubCardService.createClubCard(this.clubCard)
          .subscribe(
            (successResponse) => {
              console.log(successResponse);
              this.snackbar.open('ClubCard created successfully', undefined, {duration: 2000});
              setTimeout(() => {
                  this.router.navigateByUrl(`club-cards/${successResponse}`);
              }, 2000);
            },
            (errorResponse) => {
              console.log(errorResponse);
            }
          )
        }
}
