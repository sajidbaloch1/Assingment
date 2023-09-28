import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpParams } from '@angular/common/http';
import { IFilm, IListInterface } from 'src/app/interfaces/film.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  constructor(private readonly apiService: ApiService) {}

  public listFilm(
    page: number,
    limit: number
  ): Observable<IListInterface<IFilm>> {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('limit', limit.toString());
    return this.apiService.get('films', params);
  }

  public createFilm(payload: any) {
    return this.apiService.post('films', payload);
  }

  public updateFilm(filmId?: number, payload?: any) {
    return this.apiService.put(`films/${filmId}`, payload);
  }

  public deleteFilm(customerId: number) {
    return this.apiService.delete(`films/${customerId}`);
  }
}
