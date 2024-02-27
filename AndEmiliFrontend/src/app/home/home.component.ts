import { Component, Input } from '@angular/core';
import { BackendCallerService } from '../services/backend-caller.service';
import { CardDtoResponse } from '../dto/CardDtoResponse';
import { CardComponent } from '../card/card.component';
import {CommonModule} from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { MaterialModule } from '../material/material.module';
import { UserCardDtoResponse } from '../dto/UserCardDtoResponse';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, CommonModule, NgxPaginationModule, MaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Input() userId!: number;

  constructor(
    private backendCallerService: BackendCallerService) { }

  cards: CardDtoResponse[] = [];
  userCards: UserCardDtoResponse[] = [];
  p: number = 1;

  ngOnInit() {
    this.updateFavorites(true);
    this.getAllCards();
  }

  updateFavorites(favoritesUpdated: boolean) {
    if (favoritesUpdated) {
      this.backendCallerService.GetAllUserCards(this.userId).subscribe(userCards => {
        this.userCards = userCards;
      });
    }
  }

  getAllCards() {
    this.backendCallerService.GetAllCards().subscribe(cards => {
      this.cards = cards;
    });
  }

  showFavoritesOnlyStateChanged(change: any) {
    if (change.checked) {
      this.cards = this.cards.filter(card => this.userCards.map(x => x.scryfallId).includes(card.scryfallId));
    } else {
      this.getAllCards();
    }
  }
}
