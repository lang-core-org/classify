/**
 * @returns a uniqued selector to select the focus element, or `` if no focus
 */
function focus_selector(){
    let e = document.activeElement;
    if( e === null || e === document.body ){
        return ``;
    }else{
        let selector = ``;
        for(;e != document.documentElement; e = e.parentNode){
            selector = `> :nth-child(${
                [...e.parentNode.children].indexOf(e) + 1
            }) ${selector}`;
        }
        return `html ${selector}`;
    }
}
