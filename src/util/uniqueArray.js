
// removes items from an array of objects 
// based on provided object key
export default function uniq(a, param) {
    return a.filter(function (item, pos, array) {
        return array.map(function (mapItem) {
            return mapItem[param]
        }).indexOf(item[param]) === pos
    })
}