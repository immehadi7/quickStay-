const cardButtons = document.querySelectorAll('.card-button');
        const selectedRoomsContainer = document.querySelector('.selected-rooms');
        const totalCostElement = document.getElementById('totalCost');
        const payNowButton = document.getElementById('payNowButton');

        let selectedRooms = [];
        let totalCost = 0;

        cardButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const roomTitle = document.querySelectorAll('.card-title')[index].textContent;
                const roomPrice = parseInt(button.textContent.replace('$', ''), 10);

                if (selectedRooms.includes(roomTitle)) {
                    selectedRooms = selectedRooms.filter((room) => room !== roomTitle);
                    totalCost -= roomPrice;
                } else {
                    selectedRooms.push(roomTitle);
                    totalCost += roomPrice;
                }

                updateSelectedRooms();
            });
        });

        function createDeleteButton(roomTitle) {
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                const roomIndex = selectedRooms.indexOf(roomTitle);
                if (roomIndex !== -1) {
                    const roomPrice = getRoomPrice(roomTitle);
                    selectedRooms.splice(roomIndex, 1);
                    totalCost -= roomPrice;
                    updateSelectedRooms();
                }
            });
            return deleteButton;
        }

        function getRoomPrice(roomTitle) {
            const roomTitles = document.querySelectorAll('.card-title');
            const roomButtons = document.querySelectorAll('.card-button');
            for (let i = 0; i < roomTitles.length; i++) {
                if (roomTitles[i].textContent === roomTitle) {
                    return parseInt(roomButtons[i].textContent.replace('$', ''), 10);
                }
            }
            return 0;
        }

        function updateSelectedRooms() {
            selectedRoomsContainer.innerHTML = '';
            selectedRooms.forEach((room) => {
                const roomElement = document.createElement('div');
                roomElement.textContent = room;
                const deleteButton = createDeleteButton(room);
                roomElement.appendChild(deleteButton);
                selectedRoomsContainer.appendChild(roomElement);
            });

            totalCostElement.textContent = totalCost;
        }

        payNowButton.addEventListener('click', () => {
            alert(`You are paying a total of $${totalCost}. Payment processing can be implemented here.`);
        });