import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Character } from '../models/character.model';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit, OnDestroy {
  characters: Character[] | undefined;
  charactersSubscription: Subscription | undefined;
  loadingSubscription: Subscription | undefined;
  loading: boolean = false;
  nextSubscription: Subscription | undefined;
  next: boolean = false;
  previousSubscription: Subscription | undefined;
  previous: boolean = false;

  error = "";
  search = "";
  gender: "male" | "female" | "genderless" | "unknown" | "" = ""
  page = 1;

  changePage(val: number) {
    this.page += val;
    this.reloadService()
  }

  reloadPage() {
    this.page = 1;
    this.reloadService()
  }

  reloadService () {
    this.charactersSubscription?.unsubscribe();
    this.charactersSubscription = this.charactersService.getCharacters(this.search, this.gender, this.page).subscribe((characters) => {
      this.error = "";
      this.characters = characters;
    }, (error) => {
      this.characters = [];
      this.next = false;
      this.previous = false;
      this.error = error.message;

      if (error.status === 404) {
        this.error = "No Results";
      }
    })
  }

  constructor(private charactersService: CharactersService) { }

  ngOnInit(): void {
    this.charactersSubscription = this.charactersService.getCharacters(this.search, this.gender, this.page).subscribe((characters) => {
      this.error = "";
      this.characters = characters;
    })

    this.loadingSubscription = this.charactersService.getLoadingState().subscribe((loading) => {
      this.loading = loading;
    })
    
    this.nextSubscription = this.charactersService.getNextState().subscribe((next) => {
      this.next = next;
    })

    this.previousSubscription = this.charactersService.getPreviousState().subscribe((previous) => {
      this.previous = previous;
    })
  }

  ngOnDestroy(): void {
      this.charactersSubscription?.unsubscribe();
      this.loadingSubscription?.unsubscribe();
      this.nextSubscription?.unsubscribe();
      this.previousSubscription?.unsubscribe();
  }

}
