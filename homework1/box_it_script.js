function drawLine(number) {
    let str = "━";
    return str.repeat(number);
}

function drawTopBorder(number) {
    return `┏${drawLine(number)}┓`
}

function drawMiddleBorder(number) {
    return `┣${drawLine(number)}┫`
}

function drawBottomBorder(number) {
    return `┗${drawLine(number)}┛`
}

function drawBarsAround(string) {
    return `┃${string}`
    
}

function boxIt(array) {
    table = [];
    let sizeString = 0;
    for (let string of array) {
        if (string.length > sizeString) {
            sizeString = string.length;
        }
    }    

    table += drawTopBorder(sizeString) + '\n';
    for (let i = 0; i < array.length; i++) {
        let string = array[i];
        table += drawBarsAround(string) + " ".repeat(sizeString - string.length) + '┃' + '\n';
        if ( i !== array.length - 1){
            table += drawMiddleBorder(sizeString) + '\n';
        }
    }
    return table += drawBottomBorder(sizeString);
}
// console.log(drawLine(0));
// console.log(drawTopBorder(0));
// console.log(drawMiddleBorder(0));
// console.log(drawBottomBorder(0));
// console.log(drawBarsAround('Erika'));
console.log(boxIt(['Maria Eliza', 'Erika Balbino', 'Junior']));
// console.log(boxIt([]));
