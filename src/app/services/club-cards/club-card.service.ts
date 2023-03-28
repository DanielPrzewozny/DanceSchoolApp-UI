import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClubCard } from 'src/app/models/api-models/club-card.model';

@Injectable({
  providedIn: 'root'
})
export class ClubCardService {

  private baseApiUrl = 'http://localhost:5555';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  postBrowseClubCards(): Observable<ClubCard[]> {
    return this.httpClient.post<ClubCard[]>(this.baseApiUrl + '/ClubCard/Browse', '{}', this.httpOptions);
  }
}
