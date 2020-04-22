const palindrome = (string) => {
    return string
        .split('') //"string" => [s,t,r,i,n,g]
        .reverse() //[g,n,i,r,t,s]
        .join('') // "gnirts"
}

const average = array => {
    const reducer = (sum, item) => {
        return sum + item
    }

    return array.length === 0
        ? 0
        : array.reduce(reducer, 0) / array.length
}

module.exports = {
    palindrome,
    average,
}