import { Component } from '@angular/core';
import {fromEvent, interval, Observable} from "rxjs";
import {debounceTime, map, tap} from "rxjs/operators";

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent{
  timeDifference;
  stream;
  gameEnded = false;
  constructor() { }

  startTimer(gameTime) {
    this.gameEnded = false;
    const expireDate = new Date(
      Date.now() + gameTime
    );
    this.stream = interval(4)
      .pipe(
        map(() => expireDate.getTime() - Date.now())
      )
      .subscribe(
      (value) => {
        if(value < 0 ) {
          this.gameEnded = true;
          this.stream.unsubscribe();
        }
        else {
          this.timeDifference = new Date(value);
        }
      }
    )
  }
}
