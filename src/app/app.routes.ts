import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ClassComponent } from './class/class.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: '', redirectTo: '/signup', pathMatch: 'full' },
    { path: 'signup', title:'Login Page', component: SignupComponent, data: { hideNav: true }  },
    { path: 'home', title:'Home Page', component: HomeComponent ,data: { hideNav: false }},
    {path:'class/:classid',title:'Class Page',component:ClassComponent,data:{hideNav:false}},
    {path:'profile',title:'Profile Page',component:ProfileComponent,data:{hideNav:false}}
];
