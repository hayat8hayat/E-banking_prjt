import { ReactiveFormsModule } from '@angular/forms';
import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";
import {ClientRegistrationComponent} from "./registration/client-registration/client-registration.component";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";


@NgModule({
    declarations: [
    ],
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        ReactiveFormsModule,
        ClientRegistrationComponent,
        AppComponent,
        ClientRegistrationComponent,
        RouterModule.forRoot(routes)
    ],
    providers: [],
})
export class AppModule { }
