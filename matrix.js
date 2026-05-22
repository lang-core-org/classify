/**
 * @param src a snippet text copy from excel
 * @requires src cannot include "
 * @requires src a table fully filled out, only allowed single-column merging
 * @returns array[row][column]
 */
function matrix(src,
    err_illegal_char = `text copy from excel cannot include "`,
    err_illegal_table = `the src table should be fully filled out, only allowed single-column merging`,
    err_illegal_result = `the return value is not matrix`){
    
    let alert_throw = (e) => {
        alert(e);
        throw new Error(e);
    };

    if(src.match(/"/gv) === null){
        let mat = [];
        let x = 0;
        let y = 0;

        let view = (x,y,new_val = undefined) => {
            if(x >= 0 && y >= 0){
                if(mat[x] === undefined){
                    mat[x] = [];
                    mat[x][y] = new_val ?? mat[x][y];
                    return mat[x][y];
                }else{
                    mat[x][y] = new_val ?? mat[x][y];
                    return mat[x][y];
                }
            }else{
                return undefined;
            }
        };

        let auto_complete = (xt,yt) => {
            if(view(x,y) !== undefined){
                //no need auto complete4
                x = xt;
                y = yt;
            }else if(view(x - 1, y) !== undefined){
               view(x,y,view(x - 1, y)); //copy from same column, previous line
                x = xt;
                y = yt;
            }else{
                alert_throw(err_illegal_table);
            }
        };

        for(let t of src.match(/[^\t\n]+|\t|\n/gv)){
            switch(t){
                case `\t`:
                    auto_complete(x, y + 1);
                    break;
                case `\n`:
                    auto_complete(x + 1,0);
                    break;
                default:
                    view(x,y,t);
            }
        }

        //check if mat is a matrix
        if(
            mat.length > 0 &&
            mat.every(row => 
                row.length === mat[0].length && 
                row.every(cell => typeof(cell) === "string")
            )
        ){
            return mat;
        }else{
            //not matrix
            alert_throw(err_illegal_result);
        }
    }else{
        alert_throw(err_illegal_char);
    }
}