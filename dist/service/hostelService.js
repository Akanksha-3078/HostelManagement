export class hotelService {
    constructor() {
        this.rooms = [];
        this.resident = [];
    }
    loadData() {
        const storedRooms = localStorage.getItem("rooms");
        const storedResidents = localStorage.getItem("residents");
        console.log(storedRooms);
        console.log(storedResidents);
    }
}
