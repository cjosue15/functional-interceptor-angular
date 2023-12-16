import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, Credentials } from '../shared/data-access/auth.service';

@Component({
  selector: 'app-auth',
  template: `
    <div class="mt-[100px]">
      <div class="w-full max-w-[500px] mx-auto">
        <form
          class="bg-white border shadow-md rounded p-8"
          [formGroup]="form"
          (ngSubmit)="logIn()"
        >
          <div class="flex flex-col mb-6">
            <label class="text-sm font-bold mb-4">Email</label>
            <input
              class="border h-[48px] px-4 rounded outline-green-500"
              formControlName="email"
              type="text"
              placeholder="example@mail.com"
            />
          </div>
          <div class="flex flex-col mb-6">
            <label class="text-sm font-bold mb-4">Password</label>
            <input
              class="border h-[48px] px-4 rounded outline-green-500"
              formControlName="password"
              type="text"
              placeholder="*******"
            />
          </div>
          <div>
            <button
              class="bg-green-500 h-[48px] px-8 rounded text-white font-bold cursor-pointer hover:bg-green-600"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  standalone: true,
  imports: [ReactiveFormsModule],
})
export default class AuthComponent {
  #authService = inject(AuthService);

  #router = inject(Router);

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    email: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.required),
  });

  logIn(): void {
    if (this.form.invalid) {
      return;
    }

    const credentials: Credentials = {
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? '',
    };

    this.#authService.logIn(credentials).subscribe((value) => {
      this.#authService.saveToken(value.token);
      this.#router.navigate(['/']);
    });
  }
}
