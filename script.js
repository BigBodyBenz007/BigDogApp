let savedMemories = JSON.parse(localStorage.getItem("memories")) || [];
const memoryList = document.querySelector("#memoryList");
const button = document.querySelector(".new-memory");
const form = document.querySelector(".memory-form");
const saveButton = document.querySelector("#saveMemory");
savedMemories.forEach(function(memory, index) {
    memoryList.innerHTML += `
        <div class="memory-card">
            <h3>📝 ${memory.title}</h3>
            <p>${memory.date}</p>
            <p>📍 ${memory.location}</p>
            <p>${memory.notes}</p>
            <button class="delete-btn" data-index="${savedMemories.length - 1}">🗑️ Delete</button>
        </div>
    `;
});
document.querySelectorAll(".delete-btn").forEach(function(button) {
    button.addEventListener("click", function() {
        const index = this.dataset.index;
        savedMemories.splice(index, 1);
        localStorage.setItem("memories", JSON.stringify(savedMemories));
        location.reload();
    });
});
button.addEventListener("click", function () {
    form.style.display = "block";
});

saveButton.addEventListener("click", function () {

    const title = document.querySelector("#title").value;
    const date = document.querySelector("#date").value;
    const memoryLocation = document.querySelector("#location").value;
const notes = document.querySelector("#notes").value;
const photo = document.querySelector("#photo").files[0];
if (photo) {
    const reader = new FileReader();

    reader.onload = function(event) {
savedMemories.push({
    title: title,
    date: date,
    location: memoryLocation,
    notes: notes,
    photo: event.target.result
});
    };
reader.readAsDataURL(photo);
}
    localStorage.setItem("memories", JSON.stringify(savedMemories));
    memoryList.innerHTML += `
        <div class="memory-card">
        ${photo ? `<img src="${photo}" class="memory-photo">` : ""}
            <h3>📝 ${title}</h3>
            <p>${date}</p>
            <p>📍 ${memoryLocation}</p>
            <p>${notes}</p>
            <button class="delete-btn">🗑️ Delete</button>
        </div>
    `;
    document.querySelectorAll(".delete-btn").forEach(function(button) {
    button.onclick = function() {
        const index = this.dataset.index;
        savedMemories.splice(index, 1);
        localStorage.setItem("memories", JSON.stringify(savedMemories));
        location.reload();
    };
});
document.querySelector("#title").value = "";
document.querySelector("#date").value = "";
document.querySelector("#location").value = "";
document.querySelector("#notes").value = "";
form.style.display = "none";
});