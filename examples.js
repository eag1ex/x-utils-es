// NOTE you you have older bersion of node, you have to install esm and then run `node -r esm ./examples.js`


// esnext // defaults for node ems minified version
// import {isArray,log,objectSize,timer} from './index'

// log(objectSize([]))

// timer(()=>{
//     console.log('called')
// },2000)


// es2015 // to access this module you need to target ./dist, loads minified version
import {isArray,log,objectSize,timer} from './dist/es2015'

log(objectSize([]))

timer(()=>{
    console.log('called')
},2000)