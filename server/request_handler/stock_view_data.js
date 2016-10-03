const db = require('../../db/config.js');
const companies = process.env.tickersInDB;
const metrics = ['pricetoearnings', 'earningsyield', 'dividendyield', 'altmanzscore', 'currentratio', 'quickratio', 'leverageratio', 'beta', 'roic', 'roa', 'roe'];


module.exports = (ticker, res) => {
	if(companies.includes(ticker)){
		console.log("includes ticker")
		let datapromises = metrics.map((metric) => {
			return new Promise((resolve, reject) => {
				let results = [];
				db.query(`select ticker, ${metric}, ntile(100) over (order by cast(${metric} as decimal)) as percentile from productionschema.realdata where ${metric} is distinct from 'nm';`)
			  .on('row', row => {
			    results.push(row);
			  })
			  .on('end', function(){
			    const percentile = results.find((obj) => {
			      return obj.ticker === ticker
			    })
			    if(percentile){
			      percentile.metric = metric;
			      percentile.value = percentile[metric]
			    }

			    console.log(percentile)
			    resolve(percentile || "at DB end");
			  })
			  .on('error', err => {
			  	reject(err);
			  })
			})
		})
		
		Promise.all(datapromises)
			.then((data, ...rest) => {
				res.send(data)
			})
			.catch(err => {
				res.send("error")
			})
	}
	else{
		res.send("wrong")
	}
}