export interface Payment {
  paymentID?: string;
  amount: number;
  timeStamp: Date;
  bookingID: string;
}
