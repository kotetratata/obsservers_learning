import { Component, OnInit } from '@angular/core';
import {fromEvent, interval, Observable} from "rxjs";
import {debounceTime, map, tap} from "rxjs/operators";
import {Scheduler} from "rxjs/internal/Rx";

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {
  timeDifference;
  stream;
  gameEnded = false;
  constructor() { }

  startTimer(gameTime) {
    const expireDate = new Date(
      Date.now() + gameTime
    );
    console.log(expireDate);
    console.log(expireDate.getTime());
    console.log(Date.now());

    this.stream = interval(400)
      .pipe(
        map(() => new Date(  expireDate.getTime() - Date.now())),
        tap((value => console.log(value)))
      )
      .subscribe(
      (value) => {
        if(value.getTime() < 0 ) {
          this.gameEnded = true;
          this.stream.unsubscribe();
        }
        else {
          this.timeDifference = value;
        }
      }
    )
  }

  ngOnInit(): void {
  }

}
