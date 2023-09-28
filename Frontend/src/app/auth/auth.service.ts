import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JWT_SECRET, environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,private router: Router) {}

  post<T, T1>(path: string, body: T1) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JWT_SECRET}`,
    });

    return this.http.post<T>(`${environment.apiUrl}${path}`, body, { headers });
  }
  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
