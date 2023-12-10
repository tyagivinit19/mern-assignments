const counter = (count) => {
    setTimeout( () => {
        console.log(count++);
        counter(count)
    }, 1000)
}
let count = 1
counter(count);