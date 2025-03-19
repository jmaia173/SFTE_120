//script.js
document.addEventListener("DOMContentLoaded", () => {
    const incomeForm = document.getElementById("income-form");
    const incomeList = document.getElementById("income-list");
    const totalAmount = document.getElementById("total-amount");
    const filterCategory = document.getElementById("filter-category");

    let incomes = [];

    incomeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("income-name").value;
        const amount = parseFloat(document.getElementById("income-amount").value);
        const category = document.getElementById("income-category").value;
        const date = document.getElementById("income-date").value;

        const income = {
            id: Date.now(),
            name,
            amount,
            category,
            date
        };

        incomes.push(income);
        displayincomes(incomes);
        updateTotalAmount();

        incomeForm.reset();
    });

    incomeList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const id = parseInt(e.target.dataset.id);
            incomes = incomes.filter(income => income.id !== id);
            displayincomes(incomes);
            updateTotalAmount();
        }

        if (e.target.classList.contains("edit-btn")) {
            const id = parseInt(e.target.dataset.id);
            const income = incomes.find(income => income.id === id);

            document.getElementById("income-name").value = income.name;
            document.getElementById("income-amount").value = income.amount;
            document.getElementById("income-category").value = income.category;
            document.getElementById("income-date").value = income.date;

            incomes = incomes.filter(income => income.id !== id);
            displayincomes(incomes);
            updateTotalAmount();
        }
    });

    filterCategory.addEventListener("change", (e) => {
        const category = e.target.value;
        if (category === "All") {
            displayincomes(incomes);
        } else {
            const filteredincomes = incomes.filter(income => income.category === category);
            displayincomes(filteredincomes);
        }
    });

    function displayincomes(incomes) {
        incomeList.innerHTML = "";
        incomes.forEach(income => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${income.name}</td>
                <td>$${income.amount.toFixed(2)}</td>
                <td>${income.category}</td>
                <td>${income.date}</td>
                <td>
                    <button class="edit-btn" data-id="${income.id}">Edit</button>
                    <button class="delete-btn" data-id="${income.id}">Delete</button>
                </td>
            `;

            incomeList.appendChild(row);
        });
    }

    function updateTotalAmount() {
        const total = incomes.reduce((sum, income) => sum + income.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }
});