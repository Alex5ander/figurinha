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
    private auth: AutenticacaoService,
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

}
