import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {NgModule} from "@angular/core";
import {DestinationsPageComponent} from "./components/destinations-page/destinations-page.component";
import {ContactPageComponent} from "./components/contact-page/contact-page.component";
import {RegisterPageComponent} from "./components/register-page/register-page.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {AuthGuardService} from "./services/auth-guard.service";

export const routes: Routes = [
  {path:'home-page', component: HomePageComponent},
  {path:'destinations-page', component: DestinationsPageComponent,  canActivate: [AuthGuardService]},
  {path:'contact-page', component: ContactPageComponent},
  {path:'register-page', component: RegisterPageComponent},
  {path:'login-page', component: LoginPageComponent},
  {path:'**', component: HomePageComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
