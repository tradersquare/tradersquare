module.exports.addExtraCols = function(numOfCols) {
  for (let i = 0; i < numOfCols; i++) {
    const emptyCol = {
      colTitle: 'extraCol' + i,
      colType: 'varchar',
      optionalSize: '40'
    }
    watchListTable.push(emptyCol);
  }
}
