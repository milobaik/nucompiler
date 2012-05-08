// maybe some helper functions
var helper = function(expr, time, result) {
    
    switch ( expr.tag ) {
        case 'note':
            result.push( { tag: 'note', pitch: expr.pitch, 
                      start: time, dur: expr.dur } );
            return time + expr.dur;

        case 'seq':
            var time_left = helper( expr.left, time, result );
            return helper( expr.right, time_left, result );
            
        case 'par':
            var tl = helper( expr.left, time, result );
            var tr = helper( expr.right, time, result );
            return Math.max(tl, tr);
    }
};
    
var compile = function (musexpr) {
    // your code here
    var result = [];
    time = helper(musexpr, 0, result);
    return result;
};

var melody_mus = 
    { tag: 'seq',
      left: 
       { tag: 'seq',
         left: { tag: 'note', pitch: 'a4', dur: 250 },
         right: { tag: 'note', pitch: 'b4', dur: 250 } },
      right:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'c4', dur: 500 },
         right: { tag: 'note', pitch: 'd4', dur: 500 } } };

console.log(melody_mus);
console.log(compile(melody_mus));

