// fetchData.js
function fetchData(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject('error');  // ← rechaza solo cuando se lo indicas
      else resolve('peanut butter');
    }, 300);
  });
}

module.exports = fetchData;