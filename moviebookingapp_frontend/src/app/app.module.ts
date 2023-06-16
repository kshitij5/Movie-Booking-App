import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './views/admin/admin.component';
import { ProfileComponent } from './views/profile/profile.component';
import { MovieComponent } from './views/movie/movie.component';
import { UserComponent } from './views/user/user.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { RegisterComponent } from './views/register/register.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  AuthInterceptor,
  authInterceptorProviders,
} from './_helpers/auth.interceptor';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CardComponent } from './_shared/card/card.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DetailViewMovieComponent } from './views/movie/detail-view-movie/detail-view-movie.component';
import { TheatreComponent } from './views/theatre/theatre.component';
import { AddTheatreComponent } from './views/theatre/add-theatre/add-theatre.component';
import { AddMovieComponent } from './views/movie/add-movie/add-movie.component';
import { HallComponent } from './views/hall/hall.component';
import { DetailViewHallComponent } from './views/hall/detail-view-hall/detail-view-hall.component';
import { BookingComponent } from './views/booking/booking.component';
import { AddBookingComponent } from './views/booking/add-booking/add-booking.component';
import { ListViewTheatreComponent } from './views/theatre/list-view-theatre/list-view-theatre.component';
import { TheatreBookingComponent } from './views/theatre/theatre-booking/theatre-booking.component';
import { ListViewBookingComponent } from './views/booking/list-view-booking/list-view-booking.component';
import { DetailViewBookingComponent } from './views/booking/detail-view-booking/detail-view-booking.component';
import { SidenavComponent } from './views/sidenav/sidenav.component';
import { MaterialModule } from 'src/material.module';
import { PaymentComponent } from './views/payment/payment.component';
import { ConfirmpaymentComponent } from './views/payment/confirmpayment/confirmpayment.component';
import { ListViewTicketComponent } from './views/ticket/list-view-ticket/list-view-ticket.component';
import { DetailViewTicketComponent } from './views/ticket/detail-view-ticket/detail-view-ticket.component';
import { ListViewPaymentComponent } from './views/payment/list-view-payment/list-view-payment.component';
import { DetailViewPaymentComponent } from './views/payment/detail-view-payment/detail-view-payment.component';
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    ProfileComponent,
    MovieComponent,
    UserComponent,
    CardComponent,
    DetailViewMovieComponent,
    TheatreComponent,
    AddTheatreComponent,
    AddMovieComponent,
    HallComponent,
    DetailViewHallComponent,
    BookingComponent,
    DetailViewBookingComponent,
    AddBookingComponent,
    ListViewTheatreComponent,
    TheatreBookingComponent,
    ListViewBookingComponent,
    SidenavComponent,
    PaymentComponent,
    ConfirmpaymentComponent,
    ListViewTicketComponent,
    DetailViewTicketComponent,
    ListViewPaymentComponent,
    DetailViewPaymentComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MaterialModule,
    RouterModule.forRoot([]),
  ],
  providers: [
    AuthGuard,
    UserGuard,
    authInterceptorProviders,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
