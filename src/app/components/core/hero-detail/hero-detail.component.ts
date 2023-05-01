import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { IHero } from '../heroes/hero';
import { HeroService } from 'src/app/components/core/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit{
  hero?: IHero
  // modalSalvarRef?: BsModalRef
  // @ViewChild('modalSalvar') modalSalvar?: ElementRef

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
  ){}

  ngOnInit(): void {
    this.getHero()
  }

  getHero(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => this.hero = hero)
  }

  save(): void{
    if(this.hero){
      this.heroService.updateHero(this.hero)
      .subscribe(
        () => this.goBack()
      )
    }
  }

  goBack(){
    this.location.back()
  }

}

// O ActivatedRoute contém informações sobre a rota para esta instância do HeroDetailComponent. Este componente está interessado nos parâmetros da rota extraídos do URL. O parâmetro "id" é o id do herói para exibir.

// O HeroService obtém dados de heróis do servidor remoto e esse componente o usa para obter o herói para exibir.

// O location é um serviço angular para interagir com o navegador. Este serviço permite navegar de volta para a visualização anterior.

// O route.snapshot é uma imagem estática das informações da rota logo após a criação do componente.

// O paramMap é um dicionário de valores de parâmetros de rota extraídos do URL. O "id" chave retorna a id do herói para buscar.
