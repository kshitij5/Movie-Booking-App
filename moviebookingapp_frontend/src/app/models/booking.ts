import { Movie } from './movie';
import { Theatre } from './theatre';
import { Ticket } from './ticket';

export interface Booking {
  bookingId?: string;
  noOfTickets: number;
  totalCost: number;
  timeStamp: Date;
  movie: Movie;
  //   theatre: Theatre;
  bookingStatus: string;
  userId: string;
  hallId: number;
  ticket: Ticket[];
}
