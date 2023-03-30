import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher } from 'src/app/models/ui-models/Teacher/teacher.model';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-view-teachers',
  templateUrl: './view-teachers.component.html',
  styleUrls: ['./view-teachers.component.css']
})
export class ViewTeachersComponent {
  teacherId: string | null | undefined;
  teacher: Teacher = {
    id: 0,
    name: '',
    surname: '',
    role: 'Teacher',
    city: '',
    country: '',
    clubCardId: 0,
    danceGroup: '',
    createdBy: '',
    createdOn: '',
    modifiedBy: '',
    modifiedOn: ''
  };

  isNewTeacher: boolean = true;
  header='';

  constructor(private readonly teacherService: TeacherService,
    private readonly route: ActivatedRoute, private snackbar: MatSnackBar,
    private readonly router: Router){
    }

  ngOnInit(): void {
    //Fetch Lessons
    this.route.paramMap.subscribe(
      (params) => {
        this.teacherId = params.get('id');
        if(this.teacherId)
        {
            if(this.teacherId.toLowerCase() === 'Add'.toLowerCase())
            {
              this.isNewTeacher = true;
              this.header = 'Add New Teacher'
            }
            else
            {
              this.isNewTeacher = false;
              this.header = 'Edit Teacher'
              this.teacherService.getTeacher(this.teacherId)
              .subscribe(
                (successResponse) => {
                console.log(successResponse);
                this.teacher = successResponse;
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
    this.teacherService.updateTeacher(this.teacher)
      .subscribe(
        (successResponse) => {
          console.log(successResponse);
          this.snackbar.open('Teacher updated successfully', undefined, {duration: 2000});
          setTimeout(() => {
            this.router.navigateByUrl(`teachers`);
          }, 2000);
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      )
    }

    onCreate():void {
      this.teacherService.createTeacher(this.teacher)
        .subscribe(
          (successResponse) => {
            console.log(successResponse);
            this.snackbar.open('Teacher created successfully', undefined, {duration: 2000});
            setTimeout(() => {
                this.router.navigateByUrl(`teachers/${successResponse}`);
            }, 2000);
          },
          (errorResponse) => {
            console.log(errorResponse);
          }
        )
      }
}
