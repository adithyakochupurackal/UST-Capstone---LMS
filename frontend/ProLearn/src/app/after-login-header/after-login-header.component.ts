import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-after-login-header',
  templateUrl: './after-login-header.component.html',
  styleUrls: ['./after-login-header.component.css']
})
export class AfterLoginHeaderComponent {
  constructor(private apiService: ApiService) {}
  onLogout() {
    this.apiService.logout();

}
}
