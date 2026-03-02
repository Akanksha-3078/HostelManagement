import { hostelService } from "./service/hostelService.js";
import { UI } from "./UI/ui.js";
let service = new hostelService();
new UI(service);
//console.log(service.loadData());
//service.addResident("Raam", 23, "1233456677", 110, "June");
//service.addResident("Sita", 22, "1233456666", 109, "July");
//service.addResident("Shivani", 20, "123365366", 105, "January");
//service.addResident("Sapna", 27, "123364906", 104, "April");
//service.removeResident("1772263040331");
// service.updateResident(
//     "1772263027036",
//     "Akanksha",
//     22,
//     "9876543210",
//     102,
//     "May"
// );
//console.log(service.getVacantRooms());
//console.log(service.getOccupiedRooms());
//console.log(service.getRoomStates());
