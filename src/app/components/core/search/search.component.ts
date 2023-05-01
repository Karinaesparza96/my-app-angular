import { Component, OnInit, ViewChild } from '@angular/core';
import { IHero } from '../heroes/hero';
import { Observable, Subject, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { HeroService } from 'src/app/components/core/hero.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  heroes$!: Observable<IHero[]>
  private searchTerms = new Subject<string>()
  mostrarLista = true

  constructor(private heroService: HeroService){}
  // Push um termo de pesquisa para o fluxo observável
  search(term: string): void{
    this.searchTerms.next(term)
  }

  ngOnInit(): void {
      this.heroes$ = this.searchTerms.pipe(
        //espere 300ms após cada pressionamento de tecla antes de considerar o termo
        debounceTime(300),
        //ignorar novo termo se for igual ao termo anterior
        distinctUntilChanged(),
        // switch to new search observable each time the term changes
        switchMap((term: string) => this.heroService.searchHeroes(term))
      )
  }

}
