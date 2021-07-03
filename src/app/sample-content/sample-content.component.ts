import { Component, OnInit, ViewChild } from '@angular/core';
import { delay, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { BusyComponent } from '../busy/busy.component';

export interface SampleUser {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-sample-content',
  templateUrl: './sample-content.component.html',
  styleUrls: ['./sample-content.component.scss']
})
export class SampleContentComponent implements OnInit {
  // BusyComponent を読み込みます。
  @ViewChild('all') allBusy!: BusyComponent;
  @ViewChild('partial') partialBusy!: BusyComponent;

  // 対象となる BusyComponent が単体の場合は、BusyComponent型を指定して読み込む事も出来ます。
  // @ViewChild(BusyComponent) busy: BusyComponent;

  /**
   * テーブル用の設定です。
   */
  displayedColumns: string[] = ['id', 'name', 'email', 'phone'];
  dataSource!: SampleUser[];
  subject$ = new Subject();
  subscription!: Subscription;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // switchMap と 手動ローディングのサンプルです。
    this.subscription = this.subject$.pipe(
      tap(() => {
        this.partialBusy.start();
      }),
      switchMap((() => this.getUsers()))
    ).subscribe(x => {
      this.dataSource = x;
      this.partialBusy.stop();
    });
  }

  onPartialButtonClick(): void {
    this.subject$.next(); // switchMap によりキャンセルされます。
    this.subject$.next(); // switchMap によりキャンセルされます。
    this.subject$.next();
  }

  onAllButtonClick(): void {
    this.allBusy.add(
      this.getUsers().subscribe(x => (this.dataSource = x))
    );
  }

  onDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * サンプルユーザ情報を取得します。
   */
  getUsers(): Observable<Array<SampleUser>> {
    return this.http
      .get<Array<SampleUser>>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        delay(2000),
        map(x => x.filter(u => u.id > Math.floor(Math.random() * 10)))
      );
  }
}
