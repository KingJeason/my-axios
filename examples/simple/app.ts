import axios from '../../src/index'
import Axios from 'axios'
axios({
  method: 'get',
  url: '/simple/get?abc=12',
  params: {
    a: 1,
    b: 2
  }
})

// Axios({
//   method: 'get',
//   url: '/simple/get#abc?abc=12',
//   params: {
//     foo: 'bar'
//   }
// })
console.log('ffffslsl')
