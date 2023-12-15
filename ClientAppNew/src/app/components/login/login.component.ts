import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ReportServicesService } from 'src/app/_services/report-services.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // formData: FormGroup;
  // response;
  // constructor(private spinner: NgxSpinnerService, private loginService: AccountService, private router: Router, private fb: FormBuilder, private reportService: ReportServicesService, private logInService: AccountService, private toast: ToastrService) {
  //   loginService.addToken().subscribe(
  //     {
  //       next: (data) => {
  //         console.log(data)
  //       },
  //       error: (err) => {
  //         console.log(err.error)
  //       }
  //     },

  //   );


  //   this.formData = fb.group({
  //     userName: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]],
  //     password: ['', [Validators.required, this.passwordComplexityValidator()]]
  //   })

  // }

  // passwordComplexityValidator(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const value: string = control.value;
  //     const hasUppercase = /[A-Z]/.test(value);
  //     const hasLowercase = /[a-z]/.test(value);
  //     const hasNumber = /[0-9]/.test(value);
  //     const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value);

  //     const isValid = hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter;

  //     return isValid ? null : { 'passwordComplexity': true };
  //   };
  // }

  // get passwordControl() {
  //   return this.formData.get('password');
  // }

  // logIN() {

  //   if (this.formData.valid) {
  //     this.spinner.show()
  //     this.logInService.logIN(this.formData.value).subscribe({
  //       next: (data) => {
  //         this.spinner.hide()
  //         this.router.navigateByUrl('/home')
  //       },
  //       error: (err) => {
  //         this.spinner.hide()
  //         this.toast.error(err.error)
  //       }
  //     })
  //   }
  // }
  loginForm!: FormGroup;
  uname: string = '';
  password: string = '';
constructor(private router:Router, private fb: FormBuilder, private auth:AuthService, private _coreService:CoreService){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      uname: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value)
        .subscribe(
          (response: any) => {
            if (response.success) {
              console.log('Login successful');
              this._coreService.openSnackBar("Login Successfull!")
              this.router.navigate(['/home']);
            } else {
              this._coreService.openSnackBar("Login failed. Invalid username or password.");
              console.log('Login failed. Invalid username or password.');
            }
          },
          (error) => {
            this._coreService.openSnackBar(error.message);
            console.error('Error during login:', error);
          }
        );
    }
  }
}
