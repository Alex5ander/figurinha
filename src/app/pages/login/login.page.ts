import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AutenticacaoService } from 'src/app/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credenciais: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AutenticacaoService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.credenciais = this.fb.group({
      login: ['teste', [Validators.required, Validators.minLength(3)]],
      senha: ['123', [Validators.required]]
    });
  }

  async login(data) {
    console.log(data);
    const loading = await this.loadingController.create({ message: 'carregando' });
    loading.present();

    this.authService.login(this.credenciais.value)
      .subscribe(
        async (_) => {
          await loading.dismiss();
          this.router.navigateByUrl('/home');
        },
        async error => {
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Login falhou',
            message: error.error,
            buttons: ['OK']
          });
          alert.present();
        }
      );
  }

}
