import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service'; 
import { TokenStorageService } from '../service/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
     private tokenStorage: TokenStorageService,
     private toastr:ToastrService,
     private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.toastr.success('Logged in Successfully!')
        this.reloadPage();
        this.router.navigate(['shop']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.toastr.error('Login Failed!')
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
