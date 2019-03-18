import './index.scss';
import 'normalize.css';
console.log('in index.js');
function merge(a, b){
    return {
        ...a,
        ...b
    };
}
console.log(merge(
    {a:1},
    {b:2}
));