// Get HTML elements

const expenseForm = document.getElementById("expenseForm");

const expenseTitle = document.getElementById("expenseTitle");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const expenseDate = document.getElementById("expenseDate");

const expenseTableBody = document.getElementById("expenseTableBody");

const totalExpense = document.getElementById("totalExpense");
const expenseCount = document.getElementById("expenseCount");

const searchInput = document.getElementById("searchInput");
const submitBtn = document.getElementById("submitBtn");


// Load expenses from localStorage

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];


// Track which expense is being edited

let editIndex = -1;


// Display expenses

function displayExpenses(expenseList = expenses) {

    expenseTableBody.innerHTML = "";

    expenseList.forEach((expense, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.title}</td>

            <td>₹${Number(expense.amount).toFixed(2)}</td>

            <td>${expense.category}</td>

            <td>${expense.date}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editExpense(${index})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteExpense(${index})">
                    Delete
                </button>

            </td>
        `;

        expenseTableBody.appendChild(row);
    });

    updateSummary();
}


// Add / Update Expense

expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const title = expenseTitle.value.trim();

    const amount = expenseAmount.value;

    const category = expenseCategory.value;

    const date = expenseDate.value;


    if (!title || !amount || !category || !date) {

        alert("Please fill all fields.");

        return;
    }


    const expense = {
        title: title,
        amount: Number(amount),
        category: category,
        date: date
    };


    // Update existing expense

    if (editIndex !== -1) {

        expenses[editIndex] = expense;

        editIndex = -1;

        submitBtn.textContent = "Add Expense";

    }

    // Add new expense

    else {

        expenses.push(expense);

    }


    // Save to localStorage

    localStorage.setItem("expenses", JSON.stringify(expenses));


    // Reset form

    expenseForm.reset();


    // Display updated expenses

    displayExpenses();

});


// Edit Expense

function editExpense(index) {

    const expense = expenses[index];


    expenseTitle.value = expense.title;

    expenseAmount.value = expense.amount;

    expenseCategory.value = expense.category;

    expenseDate.value = expense.date;


    editIndex = index;


    submitBtn.textContent = "Update Expense";


    // Scroll to form

    document.querySelector(".form-section").scrollIntoView({
        behavior: "smooth"
    });

}


// Delete Expense

function deleteExpense(index) {

    const confirmation = confirm(
        "Are you sure you want to delete this expense?"
    );


    if (!confirmation) {
        return;
    }


    expenses.splice(index, 1);


    // Save updated data

    localStorage.setItem("expenses", JSON.stringify(expenses));


    // Display updated list

    displayExpenses();

}


// Search Expenses

searchInput.addEventListener("input", function() {

    const searchText = searchInput.value.toLowerCase().trim();


    const filteredExpenses = expenses.filter(function(expense) {

        return (
            expense.title.toLowerCase().includes(searchText) ||
            expense.category.toLowerCase().includes(searchText) ||
            expense.date.includes(searchText)
        );

    });


    displayExpenses(filteredExpenses);

});


// Update Summary

function updateSummary() {

    let total = 0;


    expenses.forEach(function(expense) {

        total += Number(expense.amount);

    });


    totalExpense.textContent =
        "₹" + total.toFixed(2);


    expenseCount.textContent =
        expenses.length;

}


// Initial display

displayExpenses();
