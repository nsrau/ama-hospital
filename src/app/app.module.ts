import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LIST_MODULES} from "./shared/modules";
import {LIST_COMPONENTS} from "./shared/components";
import {LIST_SERVICES} from "./shared/services";

@NgModule({
  declarations: [...LIST_COMPONENTS],
  imports: [...LIST_MODULES],
  providers: [...LIST_SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule { }
