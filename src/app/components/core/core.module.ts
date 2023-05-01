import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularInputFocusModule } from 'angular-input-focus';
import { AlertModule } from '../alert/alert.module';



@NgModule({
  declarations: [
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularInputFocusModule,
    FormsModule,
    AlertModule,
    AppRoutingModule,
    ModalModule
  ]
})
export class CoreModule { }
