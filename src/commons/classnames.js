const classNames = (...classes) => {
    let result = '';
    for (let i = 0; i < classes.length; i++) {
        console.log(result)
        if (i !== 0) {
            result += ' '
        }
        result += classes[i]
    }
    return result
}
export default classNames