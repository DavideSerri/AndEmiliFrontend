import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardDtoResponse } from '../dto/CardDtoResponse';
import { UserCardDtoResponse } from '../dto/UserCardDtoResponse';
import { UserDtoResponse } from '../dto/UserDtoResponse';

@Injectable({
  providedIn: 'root',
})
export class BackendCallerService {
  private url = "api/";
  constructor(private http: HttpClient) { }

  GetOrCreateUser(email: string): Observable<UserDtoResponse> {
    return this.http.post<UserDtoResponse>(
      this.url+"User/GetOrCreateUser?email="+email, email);
  }

  GetAllCards(): Observable<CardDtoResponse[]> {
    return this.http.get<CardDtoResponse[]>(
      this.url+"Card/GetAll");
  }

  GetAllUserCards(userId: number): Observable<UserCardDtoResponse[]> {
    return this.http.get<UserCardDtoResponse[]>(
      this.url+"UserCard/GetAll?userId="+userId);
  }

  AddUserCard(scryfallId: string, userId: number): Observable<UserCardDtoResponse> {
    return this.http.post<UserCardDtoResponse>(
      this.url+"UserCard/AddUserCard?scryfallId="+scryfallId+"&userId="+userId, { scryfallId: scryfallId, userId: userId });
  }

  DeleteUserCard(userCardId: number): Observable<UserCardDtoResponse> {
    return this.http.delete<UserCardDtoResponse>(
      this.url+"UserCard/Delete?userCardId="+userCardId);
  }
}
