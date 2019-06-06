import axios from '../../src/index'
import Axios from 'axios'
// axios({
//   method: 'get',
//   url: '/simple/get',
//   params: {
//     a: 1,
//     b: 2
//   }
// })

Axios({
  method: 'get',
  url: '/simple/get?abc=12#hash',
  params: {
    foo: 'bar'
  }
})
console.log('ffffslsl')
