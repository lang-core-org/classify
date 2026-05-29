/**
 * @returns a uniqued selector to select the focus element, or `` if no focus
 */
function focus_selector(){
    let e = document.activeElement;
    if(e === document.body){
        return ``;
    }else{
        let selector = ``;
        for(;e != document.body; e = e.parentNode){
            selector = `> :nth-child(${
                [...e.parentNode.children].indexOf(e) + 1
            }) ${selector}`;
        }
        return `body ${selector}`;
    }
}