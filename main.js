// Clear all filters
function clear_filter_options(filter_options) {
  for (filter_option of filter_options) {
    filter_option.checked = false;
  }
}

// get selected filters
function get_selected_filters(filter_options) {
  let selected_filters = [];

  for (filter_option of filter_options) {
    filter_option &&
      filter_option.checked === true &&
      selected_filters.push(filter_option.labels[0].firstChild.data);
  }

  return selected_filters;
}

// Toggle filter pannel
function togglePanel() {
  panel_btn.nextElementSibling.classList.toggle("toggled");
}

// Get HTML elements
const accordion_items = document.querySelectorAll(".accordion-item");
const filter_options = document.querySelectorAll(
  '.accordion-item-body input[type="checkbox"]'
);
const panel_btn = document.querySelector(".panel-btn");
const clear_all = document.querySelector(".clear-all");
const save_view = document.querySelector(".save-view");

for (accordion_item of accordion_items) {
  // Get HTML elements inside the accordion-item
  const input = accordion_item.firstElementChild.firstElementChild;
  const accordion_item_body = accordion_item.lastElementChild;
  const view_all_btn = accordion_item_body.firstElementChild.lastElementChild;
  const filter_options_item =
    accordion_item_body.firstElementChild.firstElementChild.children;
  const filter_options_length = filter_options_item.length;

  // Toggle accordion
  input.onclick = function () {
    accordion_item_body.classList.toggle("hide");
  };

  // Hide view all button for accordion-items with less then 6 filter options
  if (filter_options_length < 6) {
    view_all_btn.style.display = "none";
  }

  // Hide filter options
  for (const [index, filter_option] of Array.from(
    filter_options_item
  ).entries()) {
    if (index > 4) {
      filter_option.classList.toggle("hide");
    }
  }

  // show or hide filter buttons
  view_all_btn.onclick = function () {
    for (let i = 5; i < filter_options_length; i++) {
      filter_options_item[i].classList.toggle("hide");
    }
    view_all_btn.innerHTML =
      view_all_btn.innerHTML === "View all..." ? "View less" : "View all...";
  };
}

// Toggle filter panel
panel_btn.onclick = togglePanel;

// Clear all
clear_all.onclick = function () {
  clear_filter_options(filter_options);
};

// Save view
save_view.onclick = function () {
  const selected_filters = get_selected_filters(filter_options);
  console.log(selected_filters);
  togglePanel();
  clear_filter_options(filter_options);
};

// close accordion items on window load
window.onload = function () {
  for (accordion_item of accordion_items) {
    const accordion_item_input =
      accordion_item.firstElementChild.firstElementChild;
    accordion_item_input.checked = false;
  }
};
