import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddApprenticeRequest } from 'src/app/models/api-models/Apprentice/add-apprentice-request';
import { Apprentice } from 'src/app/models/api-models/Apprentice/apprentice.model';

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

  getApprentice(id: string): Observable<Apprentice> {
    return this.httpClient.get<Apprentice>(this.baseApiUrl + '/Apprentice/' + id, this.httpOptions);
  }

  createApprentice(apprenticeRequest: Apprentice): Observable<number> {
    const addApprenticeRequest: AddApprenticeRequest = {
      id: apprenticeRequest.id,
      name: apprenticeRequest.name,
      role: 'Apprentice',
      surname: apprenticeRequest.surname,
      city: apprenticeRequest.city,
      country: apprenticeRequest.country,
      clubCardId: apprenticeRequest.clubCardId,
      danceGroup: apprenticeRequest.danceGroup
    }

    return this.httpClient.put<number>(this.baseApiUrl + '/Apprentice/Create', addApprenticeRequest, this.httpOptions);
  }
}
