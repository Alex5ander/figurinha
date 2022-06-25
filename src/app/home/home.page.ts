import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private authService: AutenticacaoService,
    private router: Router
  ) { }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
