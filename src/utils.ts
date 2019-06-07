export const forEach = (obj: any, fn: (item?: any, key?: string, obj?: any) => void) => {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj]
  }

  if (Array.isArray(obj)) {
    // Iterate over array values
    // tslint:disable-next-line:one-variable-per-declaration
    for (let i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj)
    }
  } else {
    // Iterate over object keys
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj)
      }
    }
  }
}

export const isObject = (val: any): val is Object => {
  return val !== null && typeof val === 'object'
}

export const isDate = (val: any): val is Date => {
  return toString.call(val) === '[object Date]'
}
