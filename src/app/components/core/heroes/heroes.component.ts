import { Component, OnInit, ViewChild } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IHero } from './hero';
import { HeroService } from 'src/app/components/core/hero.service';
import { Observable, tap } from 'rxjs';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes?: IHero[];
  heroSelected?: IHero
  //heroes$?: Observable<IHero[]>
  deleteModalRef?: BsModalRef;
  @ViewChild('deleteModal') deleteModal:any;
  @ViewChild('alertSucess') alertSucess:any;

  constructor(
    private heroService: HeroService,
    private modalService: BsModalService,
    private alertService: AlertService
    ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
    //this.heroes$ = this.heroService.getHeroes()
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return this.alertService.error('Não foi possível adicionar seu heroi');
    }
    this.heroService.addHero({ name } as IHero)
    .subscribe((hero) => {
      this.heroes?.push(hero)
      this.alertService.success('Heroi adicionado com sucesso!');
    });
  }

  delete(hero: IHero): void {
    this.heroSelected = hero
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'})

  }

  confirmDelete(){
    if(this.heroSelected){
      this.heroes = this.heroes?.filter((h) => h !== this.heroSelected)
      this.heroService.deleteHero(this.heroSelected.id).subscribe({
        next: () => this.declineDelete(),
        error: (err) => console.log(err)
      });
    }
  }

  declineDelete(){
    this.deleteModalRef?.hide()
  }

}
