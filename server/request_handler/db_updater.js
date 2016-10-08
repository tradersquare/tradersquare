const username = process.env.INTRINIO_USER;
const password = process.env.INTRINIO_PASSWORD;
const path = require('path');
const intrinio = require(path.resolve(__dirname, "intrinio"))(username, password);
const db = require('../../db/config.js');
// const allTickers = ["MMM","AAPL","FB","LM","YHOO","ABT","ABBV","ACN","ATVI","MMM","AAPL","FB","YHOO","ABT","ABBV","ACN","ATVI","AYI","ADBE","AES","AET","A","GOOGL","GOOGL","AES","AET","A","GOOGL","GOOGL","AFL","AMG","APD","AKAM","ALK","ALB","AA","LNT","ALXN","ALLE","ADS","ALL","AXP","MO","AMZN","AEE","AEP","AIG","AMT","AWK","AMP","AON","ABC","AME","AMGN","APH","APC","ADI","ANTM","APA","AIV","AJG","AMAT","ADM","AIZ","AVB","T","ADSK","ADP","AN","AZO","AVGO","AVY","BHI","BLL","BAC","BK","BCR","BAX","BBT","BLK","BDX","BBBY","LNC","BBY","BIIB","HRB","BA","BWA","BXP","BXP","BSX","BMY","BSX","BMY","CHRW","CA","COG","CPB","COF","CBG","CAH","HSIC","KMX","CCL","CAT","CBS","CELG","CNC","CNP","CTL","CERN","CF","SCHW","CMG","CHTR","CHK","CVX","CMG","CINF","CHD","CI","XEC","CTAS","CSCO","C","CME","CTXS","CLX","CMS","COH","KO","CTSH","CL","CMCSA","CMA","CINF","CAG","CXO","COP","ED","STZ","GLW","COST","CCI","CHD","CI","XEC","CTAS","CSCO","C","CME","CTXS","CLX","CMS","COH","KO","CTSH","CL","CMCSA","CMA","DLR","CAG","CXO","COP","ED","STZ","GLW","COST","CCI","CSX","CMI","CVS","DHI","TRV","DHR","DRI","DVA","DE","DLPH","DAL","XRAY","DVN","DO","DFS","ETFC","DISCA","DISCA","DG","DLTR","D","DOV","DOW","DPS","DTE","DD","DUK","DNB","EMN","ETN","EBAY","ECL","EIX","EW","EA","EMR","ENDP","ETR","EOG","EQT","EFX","EQR","EQIX","ESS","EXR","EL","ES","EXC","EXPE","ESRX","XOM","FFIV","FRT","FAST","FDX","FITB","BEN","FSLR","FE","FISV","FLIR","FLS","FLR","FMC","FTI","FL","F","F","FBHS","FBHS","FCX","FTR","GPS","GRMN","GD","GE","GGP","GS","GIS","GM","GPC","GILD","GPN","GT","GWW","HAL","HBI","HOG","HAR","HRS","HIG","HCP","HAS","HCA","HP","HES","HPE","HOLX","HD","HON","HRL","HST","HBAN","HPQ","HUM","HUM","ITW","ILMN","IR","INTC","ICE","ISRG","IBM","IP","IFF","INTU","IVZ","JPM","IRM","JEC","JBHT","JNJ","JCI","JNPR","KSU","K","KEY","KIM","KMB","KMI","KLAC","KSS","KHC","KR","LB","LLL","LRCX","LEG","LEN","LVLT","LUK","L","LLY","LLTC","MAC","LKQ","MA","LMT","L","MTB","LYB","M","MNK","MRO","MPC","MAR","MMC","HBAN","MLM","MAS","MAT","MKC","HUM","ITW","ILMN","IR","INTC","ICE","MET","IBM","IP","MCK","MJN","MDT","MRK","MTD","KORS","MCHP","MU","MSFT","MHK","TAP","MDLZ","MON","MNST","NDAQ","MS","NAVI","MOS","MSI","MUR","MYL","NOV","NTAP","NFLX","NWL","NFX","NEM","NWSA","PLD","NWSA","TMK","NEE","NLSN","NKE","NI","NBL","JWN","NSC","NTRS","PAYX","NOC","NRG","NUE","NVDA","OXY","OMC","OKE","ORCL","OI","PCAR","PH","PDCO","PNR","PEP","PKI","PFE","PFE","PM","PSX","PNW","PXD","PBI","PNC","CFG","RL","PPG","PPL","PX","PCLN","PFG","PGR","PG","PRU","PSA","PEG","PHM","O","PVH","QRVO","SPG","PWR","QCOM","DGX","RRC","TSS","RTN","RHT","REGN","RF","SWKS","RSG","RAI","RHI","UDR","ROK","COL","ROP","ROST","RCL","R","CRM","SCG","SLB","SNI","STX","SEE","SRE","SHW","SIG","SLG","STT","SJM","SNA","SO","LUV","SWN","SE","MHFI","STJ","SWK","SPLS","SBUX","HOT","SRCL","SYK","STI","SYF","SYMC","SYY","TGT","TEL","TGNA","TDC","TSO","TXN","TXT","HSY","TMO","TIF","TWX","TJX","TSCO","TDG","RIG","TRIP","FOXA","FOXA","TSN","ULTA","USB","UA","UA","UNP","UAL","UNH","UPS","URI","UTX","UHS","UNM","URBN","VFC","VLO","VAR","VTR","VRSN","VRSK","VZ","VRTX","VIAB","VNO","WFC","VMC","WMT","WBA","DIS","WM","WAT","HCN","WU","WDC","WRK","WY","WHR","WFM","WMB","WSH","XL","WEC","WYN","WYNN","XEL","XRX","XLNX","XYL","YUM","ZMH","ZION","ZTS"];


module.exports = (ticker) => {
    return new Promise( (resolve, reject) => {
      intrinio.financials(ticker)
        .on('complete', (data, response) => {
          resolve(data);
        })
        .on('error', error => {
          console.log('follwing error from graph_details: module.exports');
          reject(error);
        })
    })
    .then(data => {
      console.log(data, 'this was the data got back');
      //compData type: array
      const compData = data.data;


      compData.forEach( (v, i) => {
        let col = v.tag;
        let newValue = v.value;
        db.query(`UPDATE backup.stockdatatable SET ${col} = ${newValue} WHERE ticker = '${ticker}';`)
        .on('end', () => {
          console.log('data changed', i);
        })
        .catch(console.error)
      })

    })
  }
