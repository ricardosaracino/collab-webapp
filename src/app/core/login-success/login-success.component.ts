import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.css'],
})
export class LoginSuccessComponent {

  /**
   * https://onthecode.co.uk/decode-json-web-tokens-jwt-angular/
   */
  constructor(private readonly authService: AuthService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {

    route.params.subscribe((p: { accessToken: string, refreshToken?: string }) => {


      console.log(p.accessToken);
      console.log(p.refreshToken);

      authService.setAccessToken(p.accessToken);
      authService.setRefreshToken(p.refreshToken);

      this.route.queryParams.pipe(map(p => p.redirect)).subscribe(redirect => {

        router.navigate([redirect ? redirect : '']);
      })
    });
  }
}
