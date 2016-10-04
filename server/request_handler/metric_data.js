const db = require('../../db/config.js');
const apireq = require('./api_req')
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

			    
			    resolve(percentile || "at DB end");
			  })
			  .on('error', err => {
			  	reject(err);
			  })
			})
		})
		
		Promise.all(datapromises)
			.then((data, ...rest) => {
				console.log("REST***", rest)
				const results = data.reduce((final, obj) => {
					final[obj.metric] = {
						percentile: obj.percentile,
						value: obj.value
					}
					return final;
				}, {})
				res.send(results)
			})
			.catch(err => {
				res.send("error")
			})
	}
	else{
		apireq('financials', ticker)
		.then((data)=>{
			console.log("*****", data);
			const results = {}
			if(typeof data === "object"){
				for(let key in data){
					results[key] = {
						percentile: null,
						value: data[key]
					}
				}
				res.send(results)
			}
			else{
				res.send(data)
			}
		})
	}
}