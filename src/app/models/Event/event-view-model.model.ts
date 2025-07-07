import { DEFAULT_IMG_PATH } from "../../constansts";

// export class EventViewModel {
//     event_id: number = number;
//     admin: string = ;
//     type: string = ;
//     img_path: string = ;
//     event_date: Date = Date.prototype;
//     //event_time: ?
//     description: string = ;
//     location: string = ;
//     name: string = ;
//     event_Performers: {performer: {performer_id: number, performer_name: string, description: string}}[] = [];
// }

export interface EventViewModel {
    event_id: number;
    admin: string;
    type: string;
    img_path: string;
    event_date: Date;
    //event_time: ?
    description: string;
    location: string;
    name: string;
    event_Performers: {
        event_id: number;
        perfomer_id: number;
        _event: string;
        perfomer: {
            performer_id: number;
            performer_name: string;
            description: string;
        }
    }[];
    
    event_Tickets: 
    {
      event_id: number,
      ticket_type: string,
      number_of_tickets: number,
      price: number,
      ticket: 
        {
          ticket_id: number,
          owner: string,
          event_id: number,
          dateOfPurchase: {
            year: number,
            month: number,
            day: number,
            dayOfWeek: number,
            dayOfYear: number,
            dayNumber: number
          },
          ticket_type: string,
          status: number,
          event_Ticket: string,
          _event: string,
        }
    }[]
}
