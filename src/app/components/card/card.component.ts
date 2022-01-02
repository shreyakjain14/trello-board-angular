import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreatePopUp } from '../create-board/create-popup';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input('card') card;
  @Input('boardId') boardId;
  @Output() changeCard: EventEmitter<any> = new EventEmitter();
  @Output() deleteCardEvent: EventEmitter<any> = new EventEmitter();
  public dialogRef;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.card.boardId = this.boardId;
  }

  public editCard() {
    console.log('in editCard');
    this.dialogRef = this.dialog.open(CreatePopUp, {
      data: {
        name: this.card.name,
        desc: this.card.desc,
        isModify: true,
      },
    });

    this.dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        data.cardId = this.card.id;
        data.boardId = this.boardId;
        console.log('after editing card: ', data);
        this.changeCard.emit(data);
      }
    });
  }

  public deleteCard() {
    this.deleteCardEvent.emit(this.card);
  }

  public showCardDetails() {
    console.log('showCardDetails');
  }
}
