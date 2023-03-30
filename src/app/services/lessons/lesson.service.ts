import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddLessonRequest } from 'src/app/models/api-models/Lesson/add-lesson-request';
import { Lesson } from 'src/app/models/api-models/Lesson/lesson.model';
import { UpdateLessonRequest } from 'src/app/models/api-models/Lesson/update-lesson-request';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private baseApiUrl = 'http://localhost:5555'

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  postBrowseLesson(): Observable<Lesson[]> {
    return this.httpClient.post<Lesson[]>(this.baseApiUrl + '/Lesson/Browse', '{}', this.httpOptions);
  }

  getLesson(id: string): Observable<Lesson> {
    return this.httpClient.get<Lesson>(this.baseApiUrl + '/Lesson/' + id, this.httpOptions);
  }

  deleteLesson(lessonId: string): Observable<Lesson> {
    return this.httpClient.delete<Lesson>(this.baseApiUrl + '/Lesson/' + lessonId, this.httpOptions);
  }

  updateLesson(lessonRequest: Lesson): Observable<Lesson> {
    const updateLessonRequest: UpdateLessonRequest = {
      id: lessonRequest.id,
      name: lessonRequest.name,
      danceGroup: lessonRequest.danceGroup,
      teacherId: lessonRequest.teacherId,
      timeEst: lessonRequest.timeEst,
      description: lessonRequest.description,
      everySpecificDayOfWeek: lessonRequest.everySpecificDayOfWeek,
    }

    return this.httpClient.post<Lesson>(this.baseApiUrl + '/Lesson/Update', updateLessonRequest, this.httpOptions);
  }

  createLesson(lessonRequest: Lesson): Observable<number> {
    const addLessonRequest: AddLessonRequest = {
      id: lessonRequest.id,
      name: lessonRequest.name,
      danceGroup: lessonRequest.danceGroup,
      teacherId: lessonRequest.teacherId,
      timeEst: lessonRequest.timeEst,
      description: lessonRequest.description,
      everySpecificDayOfWeek: lessonRequest.everySpecificDayOfWeek,
    }

    return this.httpClient.put<number>(this.baseApiUrl + '/Lesson/Create', addLessonRequest, this.httpOptions);
  }
}
