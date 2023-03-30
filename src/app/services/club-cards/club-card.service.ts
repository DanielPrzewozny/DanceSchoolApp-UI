import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddClubCardRequest } from 'src/app/models/api-models/ClubCard/add-club-card.model';
import { ClubCard } from 'src/app/models/api-models/ClubCard/club-card.model';
import { UpdateClubCardRequest } from 'src/app/models/api-models/ClubCard/update-club-card.model';

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

  getClubCard(id: string): Observable<ClubCard> {
    return this.httpClient.get<ClubCard>(this.baseApiUrl + '/ClubCard/' + id, this.httpOptions);
  }

  deleteClubCard(clubCardId: string): Observable<ClubCard> {
    return this.httpClient.delete<ClubCard>(this.baseApiUrl + '/ClubCard/' + clubCardId, this.httpOptions);
  }

  updateClubCard(clubCardRequest: ClubCard): Observable<ClubCard> {
    const updateClubCardRequest: UpdateClubCardRequest = {
      id: clubCardRequest.id,
      userId: clubCardRequest.userId,
      validFromDate: clubCardRequest.validFromDate,
      expirationDate: clubCardRequest.expirationDate,
      danceGroup: clubCardRequest.danceGroup
    }

    return this.httpClient.post<ClubCard>(this.baseApiUrl + '/ClubCard/Update', updateClubCardRequest, this.httpOptions);
  }

  createClubCard(clubCardRequest: ClubCard): Observable<number> {
    const addClubCardRequest: AddClubCardRequest = {
      id: clubCardRequest.id,
      userId: clubCardRequest.userId,
      validFromDate: clubCardRequest.validFromDate,
      expirationDate: clubCardRequest.expirationDate,
      danceGroup: clubCardRequest.danceGroup
    }

    return this.httpClient.put<number>(this.baseApiUrl + '/ClubCard/Create', addClubCardRequest, this.httpOptions);
  }
}
