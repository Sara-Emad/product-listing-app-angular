import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  // Inject Router in the constructor
  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [
        Validators.required, 
        this.noSpacesValidator
      ]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8), 
        this.passwordStrengthValidator
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }
  ngOnInit(): void {}

  // Custom validator to prevent spaces in username
  noSpacesValidator(control: any) {
    return control.value && control.value.includes(' ') ? 
      { noSpaces: true } : null;
  }

  // Custom validator for password strength
  passwordStrengthValidator(control: any) {
    const value = control.value;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[*@%$#]/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && 
                          hasNumber && hasSpecialChar;
    
    return passwordValid ? null : { passwordStrength: true };
  }

  // Custom validator to match passwords
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    return password && confirmPassword && password.value === confirmPassword.value 
      ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // Handle registration logic here

      this.router.navigate(['/products']);
    }
  }
}