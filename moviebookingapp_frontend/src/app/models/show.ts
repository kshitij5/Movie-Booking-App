import { Hall } from './hall';
import { Movie } from './movie';
import { Theatre } from './theatre';

export class Show {
  public showId!: number;
  public showName!: string;
  public noAvailableTicket!: number;
  public ticketStatus!: string;
  public showEndTime!: Date;
  public showStartTime!: Date;
  public showDate!: Date;
  public movie!: Movie;
  public theatre!: Theatre;
  public hall!: Hall;
}
