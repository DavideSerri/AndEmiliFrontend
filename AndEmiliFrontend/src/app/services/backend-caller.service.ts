import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserDtoResponse } from '../dto/UserDtoResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendCallerService {
  private url = "http://localhost:8080/";
  constructor(private http: HttpClient) { }

  GetOrCreateUser(email: string): Observable<UserDtoResponse> {
    return this.http.post<UserDtoResponse>(
      this.url+"User/GetOrCreateUser?email="+email, email);
  }
}
