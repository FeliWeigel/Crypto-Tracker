import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface RegisterRequest {
  firstname : string
  lastname : string
  email : string
  password : string
}

interface LoginRequest {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = 'http://localhost:3000/api/user/';
  constructor() { }

  http = inject(HttpClient)


  loadUser(user : RegisterRequest) : Observable<any> {
    return this.http.post(`${this.BASE_URL}register`, user);
  }

  authUser(user : LoginRequest) : Observable<any> {
    return this.http.post(`${this.BASE_URL}login`, user);
  }
}
