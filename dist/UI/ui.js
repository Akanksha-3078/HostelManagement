export class UI {
    //private searchInput: HTMLInputElement;
    constructor(service) {
        this.service = service;
        this.editResidentId = null;
        //this.searchInput = document.getElementById("searchInput") as HTMLInputElement;
        this.form = document.getElementById("residentForm");
        this.tableBody = document.getElementById("residentTableBody");
        this.statsDiv = document.getElementById("stats");
        this.roomSelect = document.getElementById("roomNumber");
        this.init();
    }
    init() {
        this.populateRoomDropdown();
        this.renderResidents();
        this.renderStats();
        this.handleFormSubmit();
        this.handleTableClick();
    }
    // Populate vacant rooms; when editing, also include the resident's current room
    populateRoomDropdown(selectedRoomNumber) {
        this.roomSelect.innerHTML = "";
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select a Room";
        defaultOption.disabled = true;
        defaultOption.hidden = true;
        defaultOption.selected = true;
        this.roomSelect.appendChild(defaultOption);
        const vacantRooms = this.service.getVacantRooms();
        let roomsToShow = [...vacantRooms];
        if (selectedRoomNumber !== undefined) {
            const allRooms = this.service.getRooms;
            const currentRoom = allRooms.find((r) => r.roomNumber === selectedRoomNumber);
            if (currentRoom &&
                !roomsToShow.some((r) => r.roomNumber === selectedRoomNumber)) {
                roomsToShow.push(currentRoom);
            }
        }
        if (roomsToShow.length === 0) {
            const option = document.createElement("option");
            option.textContent = "No Vacant Rooms";
            option.disabled = true;
            option.selected = true;
            this.roomSelect.appendChild(option);
            return;
        }
        roomsToShow.sort((a, b) => a.roomNumber - b.roomNumber);
        roomsToShow.forEach((room) => {
            const option = document.createElement("option");
            option.value = room.roomNumber.toString();
            option.textContent = `Room ${room.roomNumber}`;
            if (selectedRoomNumber !== undefined &&
                room.roomNumber === selectedRoomNumber) {
                option.selected = true;
            }
            this.roomSelect.appendChild(option);
        });
    }
    renderResidents() {
        this.tableBody.innerHTML = "";
        const residents = this.service.getResidents;
        residents.forEach((resident) => {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${resident.name}</td>
        <td>${resident.age}</td>
        <td>${resident.phone}</td>
        <td>${resident.roomNumber}</td>
        <td>${resident.checkIndate}</td>
        <td>
          <button data-id="${resident.id}" class="editBtn">Edit</button>
          <button data-id="${resident.id}" class="deleteBtn">Delete</button>
        </td>
      `;
            this.tableBody.appendChild(row);
        });
    }
    renderStats() {
        const stats = this.service.getRoomStates();
        this.statsDiv.innerHTML = `
      <p>Total Rooms: ${stats.total}</p>
      <p>Occupied Rooms: ${stats.occupied}</p>
      <p>Vacant Rooms: ${stats.vacant}</p>
    `;
    }
    handleFormSubmit() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const age = Number(document.getElementById("age").value);
            const phone = document.getElementById("phone")
                .value;
            const roomNumber = Number(this.roomSelect.value);
            const checkInDate = document.getElementById("checkInDate").value;
            try {
                if (this.editResidentId) {
                    // update existing resident
                    this.service.updateResident(this.editResidentId, name, age, phone, roomNumber, checkInDate);
                }
                else {
                    // create new resident
                    this.service.addResident(name, age, phone, roomNumber, checkInDate);
                }
                this.editResidentId = null;
                this.form.reset();
                this.populateRoomDropdown();
                this.renderResidents();
                this.renderStats();
            }
            catch (error) {
                alert(error.message);
            }
        });
    }
    handleTableClick() {
        this.tableBody.addEventListener("click", (event) => {
            const target = event.target;
            const id = target.getAttribute("data-id");
            if (!id)
                return;
            if (target.classList.contains("deleteBtn")) {
                this.service.removeResident(id);
                this.renderResidents();
                this.renderStats();
                this.populateRoomDropdown();
            }
            if (target.classList.contains("editBtn")) {
                this.startEdit(id);
            }
        });
    }
    startEdit(id) {
        const residents = this.service.getResidents;
        const resident = residents.find((r) => r.id === id);
        if (!resident)
            return;
        this.editResidentId = id;
        document.getElementById("name").value =
            resident.name;
        document.getElementById("age").value =
            resident.age.toString();
        document.getElementById("phone").value =
            resident.phone;
        document.getElementById("checkInDate").value =
            resident.checkIndate;
        this.populateRoomDropdown(resident.roomNumber);
    }
}
