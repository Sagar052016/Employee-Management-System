
let employees = JSON.parse(localStorage.getItem("employees")) || [];

const employeeForm = document.getElementById("employeeForm");
const employeeList = document.getElementById("employeeList");
const searchInput = document.getElementById("searchInput");

function saveEmployees() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

function displayEmployees(data = employees) {
    employeeList.innerHTML = "";

    data.forEach(employee => {
        const row = document.createElement("tr");

        [employee.name, employee.designation, employee.email, employee.phone]
            .forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

        const actions = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";
        editButton.onclick = () => editEmployee(employee.id);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = () => deleteEmployee(employee.id);

        actions.append(editButton, deleteButton);
        row.appendChild(actions);
        employeeList.appendChild(row);
    });
}

employeeForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const editId = document.getElementById("editId").value;

    const employee = {
        id: editId ? Number(editId) : Date.now(),
        name: document.getElementById("name").value.trim(),
        designation: document.getElementById("designation").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim()
    };

    if (editId) {
        employees = employees.map(item =>
            item.id === Number(editId) ? employee : item
        );
    } else {
        employees.push(employee);
    }

    saveEmployees();
    displayEmployees();
    employeeForm.reset();
    document.getElementById("editId").value = "";
    document.getElementById("submitBtn").textContent = "Add Employee";
});

function editEmployee(id) {
    const employee = employees.find(item => item.id === id);

    document.getElementById("editId").value = employee.id;
    document.getElementById("name").value = employee.name;
    document.getElementById("designation").value = employee.designation;
    document.getElementById("email").value = employee.email;
    document.getElementById("phone").value = employee.phone;
    document.getElementById("submitBtn").textContent = "Update Employee";
}

function deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
        employees = employees.filter(item => item.id !== id);
        saveEmployees();
        displayEmployees();
    }
}

searchInput.addEventListener("input", function() {
    const query = this.value.toLowerCase();

    const filtered = employees.filter(employee =>
        employee.name.toLowerCase().includes(query) ||
        employee.designation.toLowerCase().includes(query)
    );

    displayEmployees(filtered);
});

displayEmployees();
