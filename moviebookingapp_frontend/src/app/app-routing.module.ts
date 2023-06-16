import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RegisterComponent } from './views/register/register.component';
import { AdminComponent } from './views/admin/admin.component';
import { UserComponent } from './views/user/user.component';
import { MovieComponent } from './views/movie/movie.component';
import { DetailViewMovieComponent } from './views/movie/detail-view-movie/detail-view-movie.component';
import { TheatreComponent } from './views/theatre/theatre.component';
import { AddMovieComponent } from './views/movie/add-movie/add-movie.component';
import { ListViewTheatreComponent } from './views/theatre/list-view-theatre/list-view-theatre.component';
import { TheatreBookingComponent } from './views/theatre/theatre-booking/theatre-booking.component';
import { BookingComponent } from './views/booking/booking.component';
import { AddBookingComponent } from './views/booking/add-booking/add-booking.component';
import { DetailViewBookingComponent } from './views/booking/detail-view-booking/detail-view-booking.component';
import { ListViewBookingComponent } from './views/booking/list-view-booking/list-view-booking.component';
import { DetailViewHallComponent } from './views/hall/detail-view-hall/detail-view-hall.component';
import { HallComponent } from './views/hall/hall.component';
import { PaymentComponent } from './views/payment/payment.component';
import { ListViewTicketComponent } from './views/ticket/list-view-ticket/list-view-ticket.component';
import { DetailViewTicketComponent } from './views/ticket/detail-view-ticket/detail-view-ticket.component';
import { ListViewPaymentComponent } from './views/payment/list-view-payment/list-view-payment.component';
import { DetailViewPaymentComponent } from './views/payment/detail-view-payment/detail-view-payment.component';
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  {
    path: 'movie',
    component: MovieComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'view/:movieId', component: DetailViewMovieComponent },
    ],
  },

  {
    path: 'theatre',
    component: TheatreComponent,
    children: [
      { path: '', component: ListViewTheatreComponent },
      { path: 'add', component: AddMovieComponent },
      { path: 'view/:movieId', component: TheatreBookingComponent },
    ],
  },

  {
    path: 'hall',
    component: HallComponent,
    canActivate: [UserGuard],
    children: [
      { path: 'view/:showId/:hallId', component: DetailViewHallComponent },
    ],
  },

  {
    path: 'booking',
    component: BookingComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'view/:userId', component: ListViewBookingComponent },
      { path: 'view/:bookingId', component: DetailViewBookingComponent },
      { path: 'add/:showId', component: AddBookingComponent },
    ],
  },

  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [AuthGuard],

    children: [
      { path: '', component: ListViewPaymentComponent },
      {
        path: 'movie/:movieID/show/:showID/booking/:bookingID/ticket/:ticketID',
        component: DetailViewPaymentComponent,
      },
      { path: 'movieticket/:paymentID', component: DetailViewTicketComponent },
    ],
  },

  {
    path: 'ticket',
    component: ListViewTicketComponent,
    canActivate: [UserGuard],

    children: [
      {
        path: 'view/:userId',
        component: ListViewTicketComponent,
      },
      {
        path: ':userId/:ticketID',
        component: DetailViewTicketComponent,
      },
    ],
  },

  {
    path: 'profile/:userId',
    component: ProfileComponent,
    canActivate: [UserGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
