import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddTeacherRequest } from 'src/app/models/api-models/Teacher/add-teacher.model';
import { Teacher } from 'src/app/models/api-models/Teacher/teacher.model';
import { UpdateTeacherRequest } from 'src/app/models/api-models/Teacher/update-teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private baseApiUrl = 'http://localhost:5555';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  postBrowseTeachers(): Observable<Teacher[]> {
    return this.httpClient.post<Teacher[]>(this.baseApiUrl + '/Teacher/Browse', '{}', this.httpOptions);
  }

  getTeacher(id: string): Observable<Teacher> {
    return this.httpClient.get<Teacher>(this.baseApiUrl + '/Teacher/' + id, this.httpOptions);
  }

  deleteTeacher(teacherId: string): Observable<Teacher> {
    return this.httpClient.delete<Teacher>(this.baseApiUrl + '/Teacher/' + teacherId, this.httpOptions);
  }

  updateTeacher(teacherRequest: Teacher): Observable<Teacher> {
    const updateTeacherRequest: UpdateTeacherRequest = {
      id: teacherRequest.id,
      name: teacherRequest.name,
      role: 'Teacher',
      surname: teacherRequest.surname,
      city: teacherRequest.city,
      country: teacherRequest.country,
      clubCardId: teacherRequest.clubCardId,
      danceGroup: teacherRequest.danceGroup
    }

    return this.httpClient.post<Teacher>(this.baseApiUrl + '/Teacher/Update', updateTeacherRequest, this.httpOptions);
  }

  createTeacher(teacherRequest: Teacher): Observable<number> {
    const addTeacherRequest: AddTeacherRequest = {
      id: teacherRequest.id,
      name: teacherRequest.name,
      role: 'Teacher',
      surname: teacherRequest.surname,
      city: teacherRequest.city,
      country: teacherRequest.country,
      clubCardId: teacherRequest.clubCardId,
      danceGroup: teacherRequest.danceGroup
    }

    return this.httpClient.put<number>(this.baseApiUrl + '/Teacher/Create', addTeacherRequest, this.httpOptions);
  }
}
