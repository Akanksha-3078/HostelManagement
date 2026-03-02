import { roomsAvailability } from "../data/roomsData.js";
export class hostelService {
    //the first member to be executed in a class is constructor 
    constructor() {
        this.rooms = [];
        this.resident = [];
        this.loadData();
    }
    loadData() {
        const storedRooms = localStorage.getItem("rooms");
        const storedResidents = localStorage.getItem("residents");
        //console.log(storedRooms);
        //console.log(storedResidents); null and undefined are falsy value
        if (storedRooms) {
            this.rooms = JSON.parse(storedRooms);
        }
        else {
            this.rooms = roomsAvailability;
        }
        if (storedResidents) {
            this.resident = JSON.parse(storedResidents);
        }
        else {
            this.resident = [];
        }
        //console.log(this.rooms);
        //console.log(this.resident); 
    }
    //Getters  for rooms and residents
    get getRooms() {
        return this.rooms;
    }
    get getResidents() {
        return this.resident;
    }
    //Stroing the data
    saveData() {
        localStorage.setItem("rooms", JSON.stringify(this.rooms));
        localStorage.setItem("residents", JSON.stringify(this.resident));
    }
    //Add Resident
    addResident(name, age, phone, roomNumber, checkIndate) {
        const room = this.rooms.find((r) => r.roomNumber === roomNumber);
        if (!room) {
            throw new Error("Room doesn't exist");
        }
        else if (room.isOccupied) {
            throw new Error("Room is already occupied");
        }
        const newResident = {
            id: Date.now().toString(),
            //id: Date.now().toString() + Math.floor(Math.random() * 1000),
            name: name,
            age: age,
            phone: phone,
            roomNumber: roomNumber,
            checkIndate: checkIndate,
        };
        this.resident.push(newResident);
        room.isOccupied = true;
        this.saveData();
        console.log(this.rooms);
        console.log(this.resident);
    }
    //delete method from local storage
    // Delete Resident
    //         deleteResident(id: string): void {
    //           const residentIndex = this.resident.findIndex((r) => r.id === id);
    //         if (residentIndex === -1) {
    //              throw new Error("Resident not found");
    //           }
    //         const resident = this.resident[residentIndex];
    //          const room = this.rooms.find((r) => r.roomNumber === resident.roomNumber);
    //           if (room) {
    //         room.isOccupied = false;
    //         }
    //         this.resident.splice(residentIndex, 1);
    //         this.saveData();
    //          console.log("Resident deleted successfully");
    // }
    removeResident(residentID) {
        const index = this.resident.findIndex((r) => r.id === residentID);
        if (index == -1) {
            throw new Error("Resident ID does not exist");
        }
        const residetn = this.resident[index];
        const room = this.rooms.find((r) => r.roomNumber == residetn.roomNumber);
        if (!room) {
            throw new Error("Room doesn't exist");
        }
        room.isOccupied = false;
        this.resident.splice(index, 1);
        this.saveData();
        console.log("deleted successfilly");
    }
    // Update Resident
    updateResident(id, name, age, phone, roomNumber, checkIndate) {
        const resident = this.resident.find((r) => r.id === id);
        if (!resident) {
            throw new Error("Resident not found");
        }
        if (resident.roomNumber !== roomNumber) {
            const newRoom = this.rooms.find((r) => r.roomNumber === roomNumber);
            const oldRoom = this.rooms.find((r) => r.roomNumber === resident.roomNumber);
            if (!newRoom) {
                throw new Error("New room does not exist");
            }
            if (newRoom.isOccupied) {
                throw new Error("New room is already occupied");
            }
            if (oldRoom) {
                oldRoom.isOccupied = false;
            }
            newRoom.isOccupied = true;
            resident.roomNumber = roomNumber;
        }
        resident.name = name;
        resident.age = age;
        resident.phone = phone;
        resident.checkIndate = checkIndate;
        this.saveData();
        console.log("Resident updated successfully");
    }
    //get vacant rooms
    getVacantRooms() {
        return this.rooms.filter((r) => !r.isOccupied);
    }
    //get occupied rooms
    getOccupiedRooms() {
        return this.rooms.filter((r) => r.isOccupied);
    }
    // Rooms States
    getRoomStates() {
        const total = this.rooms.length;
        const occupied = this.getOccupiedRooms().length;
        const vacant = total - occupied;
        return { total, occupied, vacant };
    }
}
