import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map,filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {

  intervalSubs?:Subscription;

  constructor() {
    // this.returnObservable()
    //   .pipe(retry(1))
    //   .subscribe(
    //     (valor) => console.log('Subs:', valor),
    //     (error) => console.log('Error:', error),
    //     () => console.log('Obs terminado')
    //   );
    this.intervalSubs = this.retornaIntervalo().subscribe(console.log);
  }
  ngOnDestroy(): void {
    this.intervalSubs?.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(100).pipe(
      //take(10),
      map((valor) => valor + 1),
      filter( valor => (valor %2 === 0) ? true: false),
    );
  }

  returnObservable() {
    let i = -1;
    return new Observable((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
      }, 1000);
    });
  }
}
