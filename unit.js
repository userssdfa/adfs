
function clamp(number, lower=0, upper=1){
    return Math.min(upper,Math.max(lower,number))
}
function getMin(array, keyName) {
    //連想配列の特定のプロパティ(keyName)の最小値である要素の番号(index)を返す
    //複数最小値がある場合には複数返す(newArray)
	let min = null;
    let index = null;
    let newArray = []
    for(let i=0; i<array.length; i++){
        if(min === null){
            min = array[0][keyName];
            index = 0;
            newArray.push(index)
        }else if(min===array[i][keyName]){
            min = array[i][keyName];
            newArray.push(i)
        }else if(min>array[i][keyName]){
            min = array[i][keyName];
            newArray = [i]
        }
    }
	return newArray;
};
