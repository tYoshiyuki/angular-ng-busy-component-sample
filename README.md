# angular-ng-busy-component-sample
Angular の ng-busy のラッパーコンポーネントを利用したサンプルです

## Feature
- Angular11
- Angular Material
- ng-busy

## Note
- `BusyComponent`にてローディング対象となるコンテンツを囲うことで、指定した部分をローディングブロックすることが出来ます。

```html
<app-busy>
  <div>
    some contents...
  </div>
</app-busy>
```

- `ng-busy` の制約上、呼び出し元の親コンポーネントが、`position: relative` となっている必要があります。
- そのため、コンテンツを `position: relative` な `div` で囲う場合は、`wrapContent = true` を指定して下さい。

```html
<app-busy [wrapContent]="true">
  <div>
    some contents...
  </div>
</app-busy>
```

- `ViewChild` を利用して、呼び出し元コンポーネントから `BusyComponent` を読み込みます。

```ts
  // BusyComponent を読み込みます。
  @ViewChild('all') allBusy!: BusyComponent;
  @ViewChild('partial') partialBusy!: BusyComponent;

  // 対象となる BusyComponent が単体の場合は、BusyComponent型を指定して読み込む事も出来ます。
  // @ViewChild(BusyComponent) busy: BusyComponent;
```

- `BusyComponent.add()` に 監視対象とする `Promise / Subscription` を登録することで、ローディング処理を行うことが出来ます。

```ts
    this.partialBusy.add(
      this.getUsers().subscribe(x => (this.dataSource = x))
    );
```

- `BusyComponent.start()` を呼出すことで、手動でローディング処理を開始することが出来ます。
  - 停止する場合は、 `BusyComponent.stop()` を呼出して下さい。

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
