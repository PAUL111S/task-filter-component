let accordion_items = document.getElementsByName("accordion-item");

const labels = document.querySelectorAll('.accordion-content label');
const inputs = document.querySelectorAll('.accordion-content input');

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

