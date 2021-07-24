import { Component, Input, OnDestroy, TemplateRef, Type } from '@angular/core';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { Subscription } from 'rxjs';

/**
 * アプリケーション固有の BusyConfig を定義します。
 */
type ICustomBusyConfig = {
  template: TemplateRef<any> | Type<any>;
  busy: Array<Promise<any> | Subscription>;
  disableAnimation: boolean;
}

/**
 * ng-busy用のラッパーコンポーネントです。
 */
@Component({
  selector: 'app-busy',
  templateUrl: './busy.component.html',
  styleUrls: ['./busy.component.scss']
})
export class BusyComponent implements OnDestroy {
  /**
   * コンテンツを position: relative な div で囲う場合は、true を指定します。
   * ng-busy の制約上、呼び出し元の親コンポーネントが、position: relative となっている必要があります。
   */
  @Input() wrapContent = false;

  config: ICustomBusyConfig;

  manualBusySubscription!: Subscription;

  constructor() {
    this.config = {
      template: LoadingSpinnerComponent,
      busy: [],
      disableAnimation: true
    }
  }

  ngOnDestroy(): void {
    if (this.manualBusySubscription) {
      this.manualBusySubscription.unsubscribe();
    }

    this.config.busy.forEach(x => {
      if (x instanceof Subscription && !x.closed) {
        x.unsubscribe();
      }
    })
  }

  /**
   * ローディング動作の監視対象となる要素を追加します。
   *
   * @param items ローディング動作の監視対象となる要素
   */
  public add(...items: Array<Promise<any> | Subscription>): void {
    this.config.busy.push(...items);
  }

  /**
   * 手動でローディングを開始します。
   */
  public start(): void {
    if (!this.manualBusySubscription || this.manualBusySubscription.closed) {
      this.manualBusySubscription = new Subscription();
      this.config.busy.push(this.manualBusySubscription)
    }
  }

  /**
   * 手動でローディングを停止します。
   */
  public stop(): void {
    if (this.manualBusySubscription) {
      this.manualBusySubscription.unsubscribe();
    }
  }
}
