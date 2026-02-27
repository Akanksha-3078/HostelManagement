import { Rooms } from "../model/rooms";
import { Resident } from "../model/residents";
import { roomsAvailability } from "../data/roomsData";

export class hotelService {
    private rooms: Rooms[] = [];
    private resident: Resident[] = [];
    constructor(){
        
        }
        loadData():void{
            const storedRooms= localStorage.getItem("rooms");
            const storedResidents= localStorage.getItem("residents");
            console.log(storedRooms);
            console.log(storedResidents);
    }
}