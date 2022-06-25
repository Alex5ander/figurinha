import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = null;

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credenciais: { login, senha }): Observable<any> {
    return this.http.post('http://lucasreno.kinghost.net/login', credenciais)
      .pipe(
        map((data: any) => data.token),
        switchMap(token =>
          from(Storage.set({ key: TOKEN_KEY, value: token }))
        ),
        tap(_ => { this.isAuthenticated.next(true) })
      )
  }

  logout() {
    this.isAuthenticated.next(false);
    return Storage.remove({ key: TOKEN_KEY });
  }
}
