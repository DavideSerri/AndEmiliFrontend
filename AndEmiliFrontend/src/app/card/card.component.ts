import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { CardDtoResponse } from '../dto/CardDtoResponse';
import { UserCardDtoResponse } from '../dto/UserCardDtoResponse';
import { BackendCallerService } from '../services/backend-caller.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input()
  card: CardDtoResponse = { scryfallId: "", name: "", pennyRank: 0 };

  @Input()
  userId: number = 0;

  @Input()
  userCards: UserCardDtoResponse[] = [];

  @Output() 
  updatedFavorites = new EventEmitter<boolean>();

  isFavorite: boolean = false;
  paletteColor: string = "";
  userCardId: number = 0;

  constructor(
    private backendCallerService: BackendCallerService) { }

  ngOnInit() {
    var favorite = this.userCards.find(userCard => userCard.scryfallId == this.card.scryfallId);
    if (favorite != undefined) {
      this.paletteColor = "accent";
      this.isFavorite = true;
      this.userCardId = favorite.id as number;
    }
  }

  onClickFavorite() {
    if(this.isFavorite && this.userCardId > 0) {
      this.backendCallerService.DeleteUserCard(this.userCardId).subscribe(
        userCard => { 
          if (userCard.scryfallId == this.card.scryfallId) {
            this.paletteColor = "";
            this.isFavorite = false;
            this.userCardId = 0;
          } 
        }
      );
    } else {
      this.backendCallerService.AddUserCard(this.card.scryfallId as string, this.userId).subscribe(
        userCard => { 
          if (userCard.scryfallId == this.card.scryfallId) {
            this.paletteColor = "accent";
            this.isFavorite = true;
            this.userCardId = userCard.id as number;
          } 
        }
      );
    }
    this.updatedFavorites.emit(true);
  }
}
