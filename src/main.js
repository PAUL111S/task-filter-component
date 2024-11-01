class FilterComponent {
  constructor(
    panel_btn_selector = ".panel-btn",
    panel_selector = ".panel",
    clear_all_btn_selector = ".clear-all",
    save_view_btn_selector = ".save-view",
    search_bar_selector = "#search-bar",
    filter_option_selector = ".filter-option-checkbox",
    accordion_selector = ".accordion"
  ) {
    // Select element
    this.panel_btn = document.querySelector(panel_btn_selector);
    this.panel = document.querySelector(panel_selector);
    this.clear_all_btn = document.querySelector(clear_all_btn_selector);
    this.save_view_btn = document.querySelector(save_view_btn_selector);
    this.search_bar = document.querySelector(search_bar_selector);
    this.filter_options = document.querySelectorAll(filter_option_selector);
    this.accordion = new Accordion(document.querySelector(accordion_selector));

    // Initial state
    this.is_panel_open = false;
    this.selected_filters = new Set();

    // Add event listeners
    this.initializeEvents();
  }

  initializeEvents() {
    this.panel_btn.addEventListener("click", () => {
      this.togglePanel();
    });

    this.clear_all_btn.addEventListener("click", () => {
      this.clearAll();
    });

    this.save_view_btn.addEventListener("click", () => {
      this.saveView();
    });

    this.filter_options.forEach((filter_option) => {
      filter_option.addEventListener("click", () => {
        this.toggleFilter(filter_option);
      });
    });

    window.addEventListener('load', () => {
      this.setBackTodefault();
    })
  }

  // Show or hide panel
  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
    this.panel.classList.toggle("is-open");
  }

  // Select or deselect a filter option
  toggleFilter(filter_option) {
    let is_checked = filter_option.checked;

    if (is_checked) {
      this.selected_filters.add(filter_option.id);
    } else {
      this.selected_filters.remove(filter_option.id);
    }
  }

  // Get all selected filter options
  getSlectedFilters() {
    return this.selected_filters;
  }

  // deselect (clear) all filter options
  clearAll() {
    this.selected_filters.clear();

    this.filter_options.forEach((filter_option) => {
      filter_option.checked = false;
    });
  }

  // log selected filters to the console, deselect or filter options and close the panel
  saveView() {
    const filter_selection = this.getSlectedFilters();
    filter_selection.forEach((filter) => {
      console.log(filter);
    });
    this.clearAll();
    this.close();
  }

  // close panel
  close() {
    this.is_panel_open = false;
    this.panel.classList.remove("is-open");
  }

  setBackTodefault() {
    this.close();
    this.clearAll();
    this.accordion.accordion_items.forEach(accordion_item => {
      accordion_item.close();
      accordion_item.viewLess();
    });
  }
}

class Accordion {
  constructor(accordion, accordion_item_selector = ".accordion-item") {
    this.accordion_items = Array.from(
      accordion.querySelectorAll(accordion_item_selector)
    ).map((accordion_item) => {
      return new AccordionItem(accordion_item);
    });
  }
}

class AccordionItem {
  constructor(
    accordion_item,
    filter_option_selector = ".filter-option",
    view_all_btn_selector = ".view-all",
    accordion_item_head_input_selector = ".accordion-item-head input",
    accordion_item_body_selector = ".accordion-item-body"
  ) {
    this.filter_options = accordion_item.querySelectorAll(
      filter_option_selector
    );
    this.view_all_btn = accordion_item.querySelector(view_all_btn_selector);
    this.accordion_item_head_input = accordion_item.querySelector(
      accordion_item_head_input_selector
    );
    this.accordion_item_body = accordion_item.querySelector(accordion_item_body_selector);

    // Initial state
    this.is_open = false;
    this.view_all = false;

    // set up view all button
    this.setUpViewAllBtn();

    // Initialize events
    this.initializeEvents();
  }

  // Initialize events
  initializeEvents() {
    this.view_all_btn.addEventListener('click', () => {
      this.toggleViewAll();
    });

    this.accordion_item_head_input.addEventListener('click', () => {
      this.toggleAccordionItem();
    })
  }

  // set state of accordion item
  toggleAccordionItem() {
    this.is_open = !this.is_open;
    this.accordion_item_body.classList.toggle("is-open")
  }

  toggleViewAll() {
    this.view_all ? this.viewLess() : this.viewAll();
  }

  viewAll() {
    this.view_all = true;
    // Hide filter options
    for (const filter_option of Array.from(this.filter_options).values()) {
      filter_option.classList.remove("hide");
    }
  }

  viewLess() {
    this.view_all = false;
    // Hide filter options
    for (const [index, filter_option] of Array.from(
      this.filter_options
    ).entries()) {
      if (index > 4) {
        filter_option.classList.add("hide");
      }
    }
  }

  close() {
    this.is_open = false;
    this.accordion_item_body.classList.remove("is-open");
    this.accordion_item_head_input.checked = false;
  }

  setUpViewAllBtn() {
    // hide view all button if not needed
    if (this.filter_options.length < 6) {
      this.view_all_btn.style.display = "none";
    }

    // Hide filter options
    for (const [index, filter_option] of Array.from(
      this.filter_options
    ).entries()) {
      if (index > 4) {
        filter_option.classList.toggle("hide");
      }
    }
  }



}

filter_component = new FilterComponent();