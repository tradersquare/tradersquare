module.exports.addExtraCols = (numOfCols, arr) => {
  for (let i = 0; i < numOfCols; i++) {
    const emptyCol = {
      colTitle: 'extraCol' + i,
      colType: 'varchar',
      optionalSize: '40'
    }
    arr.push(emptyCol);
  }
}
