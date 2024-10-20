const accordion_items = document.getElementsByName("accordion-item");

const labels = document.querySelectorAll('.accordion-content label');
const inputs = document.querySelectorAll('.accordion-content input');

const btn_clear_all = document.querySelector('#clear-all');
const btn_safe_view = document.querySelector('#save-view');


btn_clear_all.onclick = clear_all;
btn_safe_view.onclick = save_view;

for (accordion_item of accordion_items){

    accordion_item.onclick = view_selection;
}

const btn_view_all = document.querySelector(".btn-view-all");
btn_view_all.onclick = view_all;

view_selection();


function view_all () {
    btn_view_all.style.display = 'none';

    for (let label of labels) {
     
        label.style.display = "inline-block"
        
    }

    for (let input of inputs) {
        
        input.style.display = "inline-block"
        
    }

}

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


function clear_all() {

    inputs.forEach((input)=>{
        input.checked = false;
    })
}

function save_view() {

    inputs.forEach((input)=>{
        if (input.checked) {
            console.log(input.id)
        }
    })
}

