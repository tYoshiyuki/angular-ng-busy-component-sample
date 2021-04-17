import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgBusyModule } from 'ng-busy';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SampleContentComponent } from './sample-content/sample-content.component';
import { MatButtonModule } from '@angular/material/button';
import { BusyComponent } from './busy/busy.component';

@NgModule({
  declarations: [AppComponent, LoadingSpinnerComponent, SampleContentComponent, BusyComponent],
  imports: [BrowserModule,
    FormsModule,
    HttpClientModule,
    NgBusyModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatDividerModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
