import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Apprentice } from 'src/app/models/api-models/Apprentice/apprentice.model';
import { ApprenticeService } from 'src/app/services/apprentices/apprentice.service';

@Component({
  selector: 'app-view-apprentices',
  templateUrl: './view-apprentices.component.html',
  styleUrls: ['./view-apprentices.component.css']
})
export class ViewApprenticesComponent implements OnInit {
apprenticeId: string | null | undefined;
apprentice: Apprentice = {
    id: 0,
    name: '',
    surname: '',
    role: 'Apprentice',
    city: '',
    country: '',
    clubCardId: '',
    danceGroup: '',
    createdBy: '',
    createdOn: '',
    modifiedBy: '',
    modifiedOn: ''
  };

  isNewApprentice: boolean = true;
  header='';

  constructor(private readonly apprenticeService: ApprenticeService,
    private readonly route: ActivatedRoute, private snackbar: MatSnackBar,
    private readonly router: Router){
    }

  ngOnInit(): void {
    //Fetch Lessons
    this.route.paramMap.subscribe(
      (params) => {
        this.apprenticeId = params.get('id');
        if(this.apprenticeId)
        {
            if(this.apprenticeId.toLowerCase() === 'Add'.toLowerCase())
            {
              this.isNewApprentice = true;
              this.header = 'Add New Apprentice'
            }
            else
            {
              this.isNewApprentice = false;
              this.header = 'Edit Apprentice'
              this.apprenticeService.getApprentice(this.apprenticeId)
              .subscribe(
                (successResponse) => {
                console.log(successResponse);
                this.apprentice = successResponse;
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
    this.apprenticeService.updateApprentice(this.apprentice)
      .subscribe(
        (successResponse) => {
          console.log(successResponse);
          this.snackbar.open('Apprentice updated successfully', undefined, {duration: 2000});
          setTimeout(() => {
            this.router.navigateByUrl(`apprentices`);
          }, 2000);
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      )
    }

    onCreate():void {
      this.apprenticeService.createApprentice(this.apprentice)
        .subscribe(
          (successResponse) => {
            console.log(successResponse);
            this.snackbar.open('Apprentice created successfully', undefined, {duration: 2000});
            setTimeout(() => {
                this.router.navigateByUrl(`apprentices/${successResponse}`);
            }, 2000);
          },
          (errorResponse) => {
            console.log(errorResponse);
          }
        )
      }
}
