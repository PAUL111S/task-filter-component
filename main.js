
// Radio-Buttons
const accordion_items = document.getElementsByName("accordion-item");

// Checkboxes mit Label
const labels = document.querySelectorAll('.accordion-content label');
const inputs = document.querySelectorAll('.accordion-content input');

// Button zum toggeln des Panels
const btn_filter_panel = document.querySelector('.btn-filter-panel');

// Toolbar Buttons
const btn_clear_all = document.querySelector('#clear-all');
const btn_safe_view = document.querySelector('#save-view');

// Button zum Anzeigen des gesamten Inhaltes eines Accordion-Items 
const btn_view_all = document.querySelector(".btn-view-all");

// Zuweisung der Funktionen, die zu den Buttons gehören.
btn_clear_all.onclick = clear_all;
btn_safe_view.onclick = save_view;
btn_filter_panel.onclick = toggle_panel;
btn_view_all.onclick = view_all;


// Wenn ein Radio-Button (das Accordion-Item) betätigt wird, dann verstecke alle Checkboxes außer die ersten 5 und zeige den View-All Button.
for (accordion_item of accordion_items){

    accordion_item.onclick = view_selection;
}


// Zeige alle Elemente (Checkboxes + Label) des Accordion-Items
function view_all () {
    btn_view_all.style.display = 'none';

    for (let label of labels) {
     
        label.style.display = "inline-block"
        
    }

    for (let input of inputs) {
        
        input.style.display = "inline-block"
        
    }

}

// Zeige die ersten 4 Elemente (Checkboxes + Label) des Accordion-Items
function view_selection () {

    btn_view_all.style.display = 'block';
    
    for (let [index, label] of labels.entries()) {
        if (index > 4) {
            label.style.display = "none"
        }        
    }

    for (let [index, input] of inputs.entries()) {
        if (index > 4) {
            input.style.display = "none"
        }
    }

}

// Unselect all checkboxes
function clear_all() {

    inputs.forEach((input)=>{
        input.checked = false;
    })
}

// Log all selected checkboxes to the console and close the panel
function save_view() {

    inputs.forEach((input)=>{
        if (input.checked) {
            console.log(input.id)
        }
    })

    toggle_panel();
}

// open or close the panel
function toggle_panel() {
    const panel = document.querySelector('.panel');

    // Die Zeile wird gebraucht, weil das Panel erst durch das zweite Betätigen des Filter-Buttons geöffnet wird.
    const displayStyle = window.getComputedStyle(panel).display;

    if (displayStyle === "none"){
        panel.style.display = "block";
    }
    else {
        panel.style.display = "none";
    }
}
