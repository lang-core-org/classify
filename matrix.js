/**
 * 
 * @param html_src html src, contains one table and each cell is text
 * @returns array[row][column]
 */
function matrix(html_src,
    err_not_table = "please copy the table",
    err_not_matrix = "the return value is not matrix"){

    let alert_throw = (e) => {
        alert(e);
        throw new Error(e);
    };

    html_src = html_src.match(/(?<=<tbody>)[\s\S]+(?=<\/tbody>)/gv)?.[0];
    if(html_src !== undefined){
        let mat = [];
        let x = 0;
        let y = 0;
        let parser = new DOMParser();

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

        let fill = ({style,content}) => {
            let dx = Number.parseInt(style.match(/(?<=rowspan\s*=\s*")\d+?(?=")/gv)?.[0] ?? "1") - 1;
            let dy = Number.parseInt(style.match(/(?<=colspan\s*=\s*")\d+?(?=")/gv)?.[0] ?? "1") - 1;
            content = parser.parseFromString(content,"text/html").documentElement.textContent;

            for(;view(x,y) !== undefined; y = y + 1){}

            for(let X = x; X <= x + dx; X = X + 1){
                for(let Y = y; Y <= y + dy; Y = Y + 1){
                    view(X,Y,content);
                }
            }
        }
        for(let row of html_src.match(/(?<=<tr[^>]*?>)[\s\S]+?(?=<\/tr>)/gv)){
            for(let {groups: cell} of row.matchAll(/(?<=<td(?<style>[^>]*?)>)(?<content>[\s\S]+?)(?=<\/td>)/gv)){
                fill(cell);
            }
            x = x + 1;
            y = 0;
        }

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
            alert_throw(err_not_matrix);
        }
    }else{
        alert_throw(err_not_table);
    }

}