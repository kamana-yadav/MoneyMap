let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let budget = localStorage.getItem("budget") || 0;

// Page load hone pe data dikhao
window.onload = function() {
    document.getElementById("budgetInput").value = budget;
    displayExpenses();
    updateBudgetStatus();
}

function setBudget() {
    budget = document.getElementById("budgetInput").value;
    localStorage.setItem("budget", budget);
    updateBudgetStatus();
    alert("Budget set: ₹" + budget);
}

function addExpense() {
    let name = document.getElementById("expenseName").value;
    let amount = document.getElementById("expenseAmount").value;
    let category = document.getElementById("expenseCategory").value;

    if (name === "" || amount === "") {
        alert("Please fill both fields!");
        return;
    }

    let expense = {
        name: name,
        amount: parseFloat(amount),
        category: category
    };

    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
    updateBudgetStatus();
    clearInputs();
}

function displayExpenses() {
    let filterValue = document.getElementById("filterCategory").value;
    let list = document.getElementById("expenseList");
    let total = 0;

    list.innerHTML = "";

    expenses.forEach(function(expense, index) {
        if (filterValue === "All" || filterValue === expense.category) {
            total += expense.amount;
            list.innerHTML += `
                <li>
                    <span>${expense.category} — ${expense.name}</span>
                    <span>₹${expense.amount}</span>
                    <button onclick="deleteExpense(${index})">Delete</button>
                </li>
            `;
        }
    });

    document.getElementById("total").innerText = total;
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
    updateBudgetStatus();
}

function filterExpenses() {
    displayExpenses();
}

function updateBudgetStatus() {
    let total = expenses.reduce((sum, e) => sum + e.amount, 0);
    let status = document.getElementById("budgetStatus");

    if (budget == 0) {
        status.innerText = "";
        return;
    }

    if (total > budget) {
        status.innerText = "⚠️ Budget exceeded! ₹" + (total - budget) + " over!";
        status.style.color = "red";
    } else {
        status.innerText = "✅ Under budget! ₹" + (budget - total) + " remaining";
        status.style.color = "green";
    }
}

function clearInputs() {
    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
}