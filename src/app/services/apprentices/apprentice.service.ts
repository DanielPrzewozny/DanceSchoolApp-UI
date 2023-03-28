import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apprentice } from 'src/app/models/api-models/apprentice.model';

@Injectable({
  providedIn: 'root'
})
export class ApprenticeService {

  private baseApiUrl = 'http://localhost:5555';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  postBrowseApprentices(): Observable<Apprentice[]> {
    return this.httpClient.post<Apprentice[]>(this.baseApiUrl + '/Apprentice/Browse', '{}', this.httpOptions);
  }
}
