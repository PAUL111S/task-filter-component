class FilterComponent {
  constructor(
    panel_btn_selector,
    panel_selector,
    clear_all_btn_selector,
    save_view_btn_selector,
    search_bar_selector,
    filter_option_selector,
    accordion_selector
  ) {
    // Select element
    this.panel_btn = document.querySelector(panel_btn_selector);
    this.panel = document.querySelector(panel_selector);
    this.clear_all_btn = document.querySelector(clear_all_btn_selector);
    this.save_view_btn = document.querySelector(save_view_btn_selector);
    this.search_bar = document.querySelector(search_bar_selector);
    this.filter_options = document.querySelectorAll(filter_option_selector);
    this.accordion = new Accordion(accordion_selector);

    // Initial state
    this.is_panel_open = false;
    this.selected_filters = new Set();

    // Add event listeners
    this.initializeEvents();
  }

  initializeEvents() {
    this.panel_btn.addEventlistener("click", () => {
      this.togglePanel();
    });

    this.clear_all_btn.addEventlistener("click", () => {
      this.clearAll();
    });

    this.save_view_btn.addEventlistener("click", () => {
      this.saveView();
    });

    this.filter_options.forEach((filter_option) => {
      filter_option.addEventlistener("click", () => {
        this.toggleFilter(filter_option);
      });
    });
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

    filter_option.checked = !is_checked;
  }

  // Get all selected filter options
  getSlectedFilters() {
    return this.selected_filters;
  }

  // deselect (clear) all filter options
  clearAll() {
    this.selectedFilters.clear();

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
    this.isPanelOpen = false;
    this.panel.classList.remove("is-open");
  }
}
