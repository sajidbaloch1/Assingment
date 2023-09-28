import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public get<T>(path: string, params: HttpParams = new HttpParams()) {
    const token = localStorage.getItem('x-auth-token'); // Removed unnecessary JSON.parse
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<T>(`${environment.apiUrl}${path}`, { headers, params }); // Pass headers here
  }

  public post<T, T1>(path: string, body: T1) {
    return this.http.post<T>(`${environment.apiUrl}${path}`, body);
  }

  public put<T, T1>(path: string, body: T1) {
    return this.http.put<T>(`${environment.apiUrl}${path}`, body);
  }

  public delete<T>(path: string) {
    return this.http.delete<T>(`${environment.apiUrl}${path}`);
  }
}
