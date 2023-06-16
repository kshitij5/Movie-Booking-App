import { Booking } from './booking';
import { Seat } from './seat';

export interface Ticket {
  ticketId: String;
  seat: Seat;
  booking: Booking;
}
