import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../models/api-models/lesson.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private baseApiUrl = 'http://localhost:5555/Lesson/Browse';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  postLesson(): Observable<Lesson[]> {
    return this.httpClient.post<Lesson[]>(this.baseApiUrl, '{}', this.httpOptions);
  }
}
