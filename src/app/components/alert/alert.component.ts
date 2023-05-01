import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy{
  subscription?: Subscription;
  message: any;
  isShow = false
  constructor(private alertService: AlertService){}

  devoExibirAlerta(){
    return this.isShow
  }

  closed(){
    this.isShow = !this.isShow
  }
  ngOnInit(): void {
    this.subscription = this.alertService.getMessage().subscribe(
      message => {
        this.message = message;
        this.isShow = true;
      }
    )
  }

  ngOnDestroy(): void {
     this.subscription?.unsubscribe();
  }
}
