import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePopUp } from '../create-board/create-popup';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input('board') board;
  @Output() addCardEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteBoardEvent: EventEmitter<any> = new EventEmitter();
  @Output() changeBoardDetailsEvent: EventEmitter<any> = new EventEmitter();
  @Output() changeCardEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteCard: EventEmitter<any> = new EventEmitter();

  public id: number;
  public dialogRef;

  constructor(private dialog: MatDialog) {}

  public editBoard() {
    this.dialogRef = this.dialog.open(CreatePopUp, {
      data: {
        name: this.board.name,
        desc: this.board.desc,
        color: this.board.color,
        isBoard: true,
        isModify: true,
      },
    });

    this.dialogRef.afterClosed().subscribe((form) => {
      form.id = this.board.id;
      this.changeBoardDetailsEvent.emit(form);
    });
  }

  public addCard() {
    this.dialogRef = this.dialog.open(CreatePopUp, {
      data: {},
    });

    this.dialogRef.afterClosed().subscribe((form) => {
      if (form && form.name && form.name !== '') {
        form.boardId = this.board.id;
        this.addCardEvent.emit(form);
      }
    });
  }

  public deleteCardEvent(data) {
    this.deleteCard.emit(data);
  }

  public deleteBoard() {
    this.deleteBoardEvent.emit(this.board.id);
  }

  public changeCard(data) {
    this.changeCardEvent.emit(data);
  }
}
