import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BackendCallerService } from '../services/backend-caller.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
  });
  
  constructor(
    private backendCallerService: BackendCallerService,
    private route: ActivatedRoute,
    private router: Router ) { }

  onSubmit() {
    var email = this.loginForm.controls['emailFormControl'].value as string;
    this.backendCallerService.GetOrCreateUser(email).subscribe(
      x => {
        console.log(x);
        if (x.email != null) {
          this.router.navigate(['/home/', x.id]);
        }
      }
    );
  }
}
