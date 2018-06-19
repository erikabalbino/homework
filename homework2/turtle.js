class Turtle {
    constructor(col, row) {
        this.col = col;
        this.row = row;
        this.newGrid = []
        let array1 = [];
        let array2 = [];

      
        // const newGrid = [...Array(num)].map(e => [...Array(num)].map(e => ' '))
        // let initialPosition = [this.col, this.row]
    }

    forward(n) {
        this.newGrid[this.col, this.row] = "*";
        // let newCol = this.col;
        for (let i = 1; i < n;  i++) {
            this.newGrid[i, this.row] += "*";
        }
        console.log(this.newGrid);

    }

    right(){

    }

    left(){

    }

    allPoints(){

    }

    print(){
        function newArray(array1, array2) {
            for (let a = 0; a < array1.lenght; a++ ) {
                for (let b = 0; b < array2; b++){
                    newGrid.push([array1[a], array2[b]])
                }
            }
            return newGrid;
        }
    }

}

new Turtle(0, 4)
  .forward(3)
//   .left()
//   .forward(3)
//   .right()
//   .forward(5)
//   .right()
//   .forward(8)
//   .right()
//   .forward(5)
//   .right()
//   .forward(3)
//   .left()
//   .forward(3)
//   .print();