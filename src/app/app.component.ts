import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePopUp } from './components/create-board/create-popup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public boards: any[];
  public dialogRef;

  constructor(private dialog: MatDialog) {
    this.boards = JSON.parse(localStorage.getItem('boards')) || [];
  }

  public ngOnInit() {}

  public createBoard(board?) {
    this.dialogRef = this.dialog.open(CreatePopUp, {
      data: {
        isBoard: true,
      },
    });

    this.dialogRef.afterClosed().subscribe((form) => {
      console.log('form: ', form);
      if (board) {
        const index = this.boards.findIndex((b) => b.id == board.id);
        this.boards[index].name = form.name;
        this.boards[index].desc = form.desc;
      } else if (form) {
        form.id = this.idGenerator();
        form.cards = [];
        this.boards.push(form);
      }
      if (form) localStorage.setItem('boards', JSON.stringify(this.boards));
    });
  }

  public addCardHandler(data) {
    if (data) {
      console.log('in addCardHanlder with data', data);
      const index = this.boards.findIndex((b) => b.id === data.boardId);
      data.id = this.idGenerator();
      data.createdAt = Date.now();
      this.boards[index].cards.unshift(data);
      localStorage.setItem('boards', JSON.stringify(this.boards));
    }
  }

  public deleteCardHandler(data) {
    const boardIdx = this.boards.findIndex((b) => b.id === data.boardId);
    this.boards[boardIdx].cards = this.boards[boardIdx].cards.filter(
      (card) => card.id !== data.id
    );
    localStorage.setItem('boards', JSON.stringify(this.boards));
  }

  public deleteBoardHandler(id) {
    if (id) {
      this.boards = this.boards.filter((b) => b.id !== id);
      localStorage.setItem('boards', JSON.stringify(this.boards));
    }
  }

  public changeBoardDetailsHandler(data) {
    if (data) {
      console.log('data: ', data);
      const index = this.boards.findIndex((b) => b.id === data.id);
      console.log('index: ', index);
      this.boards[index].name = data.name;
      this.boards[index].desc = data.desc;
      this.boards[index].color = data.color;
      localStorage.setItem('boards', JSON.stringify(this.boards));
    }
  }

  public changeCardHandler(data) {
    if (data) {
      console.log('in changeCardHandler with data: ', data);
      const boardIdx = this.boards.findIndex((b) => b.id === data.boardId);
      const cardIdx = this.boards[boardIdx].cards.findIndex(
        (c) => c.id === data.cardId
      );
      this.boards[boardIdx].cards[cardIdx].name = data.name;
      this.boards[boardIdx].cards[cardIdx].desc = data.desc;
      localStorage.setItem('boards', JSON.stringify(this.boards));
    }
  }

  public dropCard(event) {
    console.log('in dropCard with data: ', event);
    if (event.container.id !== event.previousContainer.id) {
      const card =
        this.boards[event.previousContainer.data].cards[event.previousIndex];
      this.boards[event.previousContainer.data].cards = this.boards[
        event.previousContainer.data
      ].cards.filter((card, idx) => idx !== event.previousIndex);

      this.boards[event.container.data].cards.push(card);
      this.boards[event.container.data].cards.sort((c1, c2) => {
        if (c1.createdAt < c2.createdAt) return 1;
        else if (c1.createdAt > c2.createdAt) return -1;
        else return 0;
      });

      localStorage.setItem('boards', JSON.stringify(this.boards));
    }
  }

  public getConnectedLists(id) {
    const arr = [];
    this.boards.forEach((b) => {
      if (b.id !== id) arr.push(b.id);
    });
    return arr;
  }

  private idGenerator() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}
