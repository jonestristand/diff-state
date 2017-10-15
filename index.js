
module.exports = function diffState(newState, oldState) 
{
  var patch = {};

  for(var key in newState) {

    if (oldState.hasOwnProperty(key)) {

      if (typeof newState[key] === 'object' && !Array.isArray(newState[key])) {
        if (newState[key] !== null) {
            // Object type, recur deeper
            subObj = diffState(newState[key], oldState[key]);
            if (subObj !== undefined)
              patch[key] = diffState(newState[key], oldState[key]);
        }
      } else if (Array.isArray(newState[key])) {
        // This is an array
        if (!arrEqual(newState[key], oldState[key])) {
          patch[key] = newState[key];
        }
      } else {
        // Value type, return from here
        if (newState[key] !== oldState[key])
          patch[key] = newState[key];
      }

    } else {
      // This is an entirely new key, return it
      patch[key] = newState[key];
    }

  }

  return Object.keys(patch).length === 0 && patch.constructor === Object ? 
    undefined :
    patch;
}

function arrEqual (arr1, arr2) {
    // if the other array is a falsy value, return
    if (!arr2)
        return false;

    // compare lengths - can save a lot of time 
    if (arr1.length != arr2.length)
        return false;

    for (var i = 0, l=arr1.length; i < l; i++) {
        // Check if we have nested arrays
        if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
            // recurse into the nested arrays
            if (!arrEqual(arr1[i], arr2[i]))
                return false;
        } else if (typeof arr1[i] === "object" && !Array.isArray(arr2[i])) {
          if (diffState(arr1, arr2) !== undefined)
            return false; // Objects not equal
        } else if (arr1[i] != arr2[i]) { 
            return false; // Values are not equal
        }           
    }       
    return true;
}