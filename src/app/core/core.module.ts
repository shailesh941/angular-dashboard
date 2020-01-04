import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
    declarations: [
      HeaderComponent,
      FooterComponent,
      SideBarComponent
    ],
    imports: [
      BrowserModule,
      CoreRoutingModule
    ],
    providers: [],
  })
  export class CoreModule { }
  