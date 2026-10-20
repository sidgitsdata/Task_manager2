/**
 * Student Task Manager - script.js
 * Clean, beginner-friendly vanilla JavaScript for task management
 * Features: LocalStorage persistence, Add/Edit/Delete/Complete tasks,
 * Summary metrics calculation, Filtering, and Client-side navigation views.
 */

// Storage key used in localStorage
const STORAGE_KEY = "student_task_manager_tasks";

// In-memory list of tasks
let tasks = [];

// Current task filter: 'all' | 'pending' | 'completed'
let currentFilter = "all";

// ==========================================
// DOM Element References
// ==========================================
const taskListEl = document.getElementById("task-list");
const emptyStateEl = document.getElementById("empty-state");

const statTotalEl = document.getElementById("stat-total");
const statPendingEl = document.getElementById("stat-pending");
const statCompletedEl = document.getElementById("stat-completed");

const taskModal = document.getElementById("task-modal");
const taskForm = document.getElementById("task-form");
const modalTitle = document.getElementById("modal-title");
const taskIdInput = document.getElementById("task-id");
const taskTitleInput = document.getElementById("task-title");
const taskSubjectInput = document.getElementById("task-subject");
const taskDueDateInput = document.getElementById("task-due-date");
const taskPriorityInput = document.getElementById("task-priority");
const titleErrorEl = document.getElementById("title-error");

const openAddModalBtn = document.getElementById("open-add-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cancelModalBtn = document.getElementById("cancel-modal-btn");

// Delete confirmation modal elements
const deleteModal = document.getElementById("delete-modal");
const closeDeleteModalBtn = document.getElementById("close-delete-modal-btn");
const cancelDeleteBtn = document.getElementById("cancel-delete-btn");
const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
const deleteModalMessage = document.getElementById("delete-modal-message");
let taskToDeleteId = null;

const filterBtns = document.querySelectorAll(".filter-btn");

// Navigation elements
const navBrand = document.getElementById("nav-brand");
const navDashboard = document.getElementById("nav-dashboard");
const navPrivacy = document.getElementById("nav-privacy");
const navTerms = document.getElementById("nav-terms");
const footerPrivacyBtn = document.getElementById("footer-privacy-btn");
const footerTermsBtn = document.getElementById("footer-terms-btn");
const privacyBackBtn = document.getElementById("privacy-back-btn");
const termsBackBtn = document.getElementById("terms-back-btn");

const views = {
  dashboard: document.getElementById("dashboard-view"),
  privacy: document.getElementById("privacy-view"),
  terms: document.getElementById("terms-view")
};

// ==========================================
// Initialization
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  setupEventListeners();
  render();
});

// ==========================================
// Local Storage Operations
// ==========================================
function loadTasks() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (rawData) {
      tasks = JSON.parse(rawData);
    } else {
      // Provide initial sample tasks so the student has a ready-to-present demo
      tasks = [
        {
          id: "task-1",
          title: "Prepare Data Structures Presentation",
          subject: "Computer Science",
          dueDate: "2026-10-25",
          priority: "High",
          completed: false
        },
        {
          id: "task-2",
          title: "Complete Linear Algebra Exercise 4",
          subject: "Mathematics",
          dueDate: "2026-10-28",
          priority: "Medium",
          completed: true
        },
        {
          id: "task-3",
          title: "Submit Physics Lab Journal",
          subject: "Physics",
          dueDate: "2026-11-02",
          priority: "Low",
          completed: false
        }
      ];
      saveTasks();
    }
  } catch (error) {
    console.error("Failed to load tasks from localStorage:", error);
    tasks = [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to localStorage:", error);
  }
}

// ==========================================
// Event Listeners Setup
// ==========================================
function setupEventListeners() {
  // Modal open & close
  openAddModalBtn.addEventListener("click", () => openModal());
  closeModalBtn.addEventListener("click", closeModal);
  cancelModalBtn.addEventListener("click", closeModal);

  // Close modal when clicking outside of modal card
  taskModal.addEventListener("click", (e) => {
    if (e.target === taskModal) {
      closeModal();
    }
  });

  // Delete modal events
  closeDeleteModalBtn.addEventListener("click", closeDeleteModal);
  cancelDeleteBtn.addEventListener("click", closeDeleteModal);
  deleteModal.addEventListener("click", (e) => {
    if (e.target === deleteModal) {
      closeDeleteModal();
    }
  });
  confirmDeleteBtn.addEventListener("click", handleConfirmDelete);

  // Form submit
  taskForm.addEventListener("submit", handleFormSubmit);

  // Filter buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      render();
    });
  });

  // Navigation Links
  navBrand.addEventListener("click", () => switchView("dashboard"));
  navDashboard.addEventListener("click", () => switchView("dashboard"));
  navPrivacy.addEventListener("click", () => switchView("privacy"));
  navTerms.addEventListener("click", () => switchView("terms"));

  footerPrivacyBtn.addEventListener("click", () => switchView("privacy"));
  footerTermsBtn.addEventListener("click", () => switchView("terms"));
  privacyBackBtn.addEventListener("click", () => switchView("dashboard"));
  termsBackBtn.addEventListener("click", () => switchView("dashboard"));

  // Real-time title validation feedback
  taskTitleInput.addEventListener("input", () => {
    if (taskTitleInput.value.trim()) {
      titleErrorEl.textContent = "";
    }
  });
}

// ==========================================
// View Switching Logic (Single Page Navigation)
// ==========================================
function switchView(viewName) {
  // Update view containers
  Object.keys(views).forEach((key) => {
    if (key === viewName) {
      views[key].classList.add("active");
    } else {
      views[key].classList.remove("active");
    }
  });

  // Update navbar button highlights
  navDashboard.classList.toggle("active", viewName === "dashboard");
  navPrivacy.classList.toggle("active", viewName === "privacy");
  navTerms.classList.toggle("active", viewName === "terms");

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// Modal Handling (Add / Edit)
// ==========================================
function openModal(taskToEdit = null) {
  taskForm.reset();
  titleErrorEl.textContent = "";

  if (taskToEdit) {
    modalTitle.textContent = "Edit Task";
    taskIdInput.value = taskToEdit.id;
    taskTitleInput.value = taskToEdit.title;
    taskSubjectInput.value = taskToEdit.subject || "";
    taskDueDateInput.value = taskToEdit.dueDate || "";
    taskPriorityInput.value = taskToEdit.priority || "Medium";
  } else {
    modalTitle.textContent = "Add New Task";
    taskIdInput.value = "";
    taskPriorityInput.value = "Medium";
  }

  taskModal.classList.remove("hidden");
  taskTitleInput.focus();
}

function closeModal() {
  taskModal.classList.add("hidden");
}

function handleFormSubmit(e) {
  e.preventDefault();

  const title = taskTitleInput.value.trim();
  const subject = taskSubjectInput.value.trim();
  const dueDate = taskDueDateInput.value;
  const priority = taskPriorityInput.value;
  const taskId = taskIdInput.value;

  // Validation
  if (!title) {
    titleErrorEl.textContent = "Please enter a task title.";
    taskTitleInput.focus();
    return;
  }

  if (taskId) {
    // Edit existing task
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].title = title;
      tasks[taskIndex].subject = subject;
      tasks[taskIndex].dueDate = dueDate;
      tasks[taskIndex].priority = priority;
    }
  } else {
    // Add new task
    const newTask = {
      id: "task-" + Date.now(),
      title: title,
      subject: subject,
      dueDate: dueDate,
      priority: priority,
      completed: false
    };
    tasks.unshift(newTask);
  }

  saveTasks();
  closeModal();
  render();
}

// ==========================================
// Task Actions (Toggle, Edit, Delete)
// ==========================================
function toggleTaskCompletion(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    render();
  }
}

function editTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    openModal(task);
  }
}

function deleteTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  taskToDeleteId = id;
  deleteModalMessage.textContent = `Are you sure you want to delete "${task.title}"? This action cannot be undone.`;
  deleteModal.classList.remove("hidden");
  confirmDeleteBtn.focus();
}

function closeDeleteModal() {
  taskToDeleteId = null;
  deleteModal.classList.add("hidden");
}

function handleConfirmDelete() {
  if (!taskToDeleteId) return;

  tasks = tasks.filter((t) => t.id !== taskToDeleteId);
  saveTasks();
  closeDeleteModal();
  render();
}

// ==========================================
// Render Logic & Statistics
// ==========================================
function render() {
  updateSummaryStats();
  renderTaskList();
}

function updateSummaryStats() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  statTotalEl.textContent = total;
  statPendingEl.textContent = pending;
  statCompletedEl.textContent = completed;
}

function renderTaskList() {
  // Filter tasks based on current selection
  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "pending") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true; // 'all'
  });

  // Empty state handling
  if (filteredTasks.length === 0) {
    taskListEl.innerHTML = "";
    emptyStateEl.classList.remove("hidden");
    return;
  }

  emptyStateEl.classList.add("hidden");
  taskListEl.innerHTML = "";

  // Build task cards
  filteredTasks.forEach((task) => {
    const card = document.createElement("div");
    card.className = `task-card ${task.completed ? "completed" : ""}`;

    // Priority badge class
    const priorityClass = `badge-priority-${task.priority.toLowerCase()}`;

    // Format display date
    const formattedDate = formatDate(task.dueDate);

    card.innerHTML = `
      <div class="task-left">
        <input 
          type="checkbox" 
          class="task-checkbox" 
          aria-label="Mark task as complete"
          ${task.completed ? "checked" : ""}
        >
        <div class="task-details">
          <span class="task-title">${escapeHtml(task.title)}</span>
          <div class="task-meta">
            ${task.subject ? `<span class="badge badge-subject">${escapeHtml(task.subject)}</span>` : ""}
            <span class="badge ${priorityClass}">${task.priority} Priority</span>
            ${formattedDate ? `<span class="task-due">Due: ${formattedDate}</span>` : ""}
          </div>
        </div>
      </div>
      <div class="task-actions">
        <button type="button" class="action-btn action-btn-edit">Edit</button>
        <button type="button" class="action-btn action-btn-delete">Delete</button>
      </div>
    `;

    // Event listener for checkbox
    const checkbox = card.querySelector(".task-checkbox");
    checkbox.addEventListener("change", () => toggleTaskCompletion(task.id));

    // Event listener for edit button
    const editBtn = card.querySelector(".action-btn-edit");
    editBtn.addEventListener("click", () => editTask(task.id));

    // Event listener for delete button
    const deleteBtn = card.querySelector(".action-btn-delete");
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    taskListEl.appendChild(card);
  });
}

// ==========================================
// Helper Utility Functions
// ==========================================
function formatDate(dateString) {
  if (!dateString) return "";
  const parts = dateString.split("-");
  if (parts.length !== 3) return dateString;
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  
  // Format as readable month & day
  const dateObj = new Date(year, month - 1, day);
  if (isNaN(dateObj.getTime())) return dateString;
  
  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function escapeHtml(text) {
  if (!text) return "";
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
