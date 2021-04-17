import { Component, OnInit, ViewChild } from '@angular/core';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusyComponent } from '../busy/busy.component';

interface SampleUser {
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

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  onPartialButtonClick(): void {
    this.partialBusy.add(
      this.getUsers().subscribe(x => (this.dataSource = x))
    );
  }

  onAllButtonClick(): void {
    this.allBusy.add(
      this.getUsers().subscribe(x => (this.dataSource = x))
    );
  }

  /**
   * サンプルユーザ情報を取得します。
   */
  getUsers(): Observable<Array<SampleUser>> {
    return this.http
      .get<Array<SampleUser>>('https://jsonplaceholder.typicode.com/users')
      .pipe(delay(2000));
  }
}
