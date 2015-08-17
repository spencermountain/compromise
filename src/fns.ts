
let fns= {
//make array of arrays into one array
flatten: function() {
    var the=this
    return [].concat.apply([], the)
},
}