import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // data:any = null

  // constructor(private observableService: ObservableService){
  //   this.observableService.getObservable().subscribe({
  //     next: (newvalue) => this.data = newvalue
  //   })
  // }

  // mudaValorDoObservable(){
  //   const newvalue = {name: 'joao'}
  //   this.observableService.setObservable(newvalue)
  // }
  title = 'my-app'

}
