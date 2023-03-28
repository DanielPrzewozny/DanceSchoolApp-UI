import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from 'src/app/models/api-models/teacher.model';

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
}
