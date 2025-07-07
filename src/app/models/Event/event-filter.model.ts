export class EventFilter {
    dateStart: Date | undefined;
    dateEnd: Date | undefined;
    location: string;
    name: string;
    performer: string;

    constructor(){
        this.location = "";
        this.name = "";
        this.performer = "";
    }
}
