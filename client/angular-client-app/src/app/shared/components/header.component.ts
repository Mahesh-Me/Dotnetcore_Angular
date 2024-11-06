import { Component } from '@angular/core';
import { AuthenticateService } from '../../core/authentication/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private _authService:AuthenticateService,
    private _router:Router
  ){}

  onLogOut(){
    this._authService.clientlogout().subscribe({
      next:() => {
        this._router.navigate(['/auth/login']);
      }
    })
  }
}
