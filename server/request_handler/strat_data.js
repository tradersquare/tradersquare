const path = require('path');
const restler = require('restler');
const username = process.env.INTRINIO_USER;
const password = process.env.INTRINIO_PASSWORD;
const intrinio = require(path.resolve( __dirname, "intrinio"))(username, password);
const apiReq = require('./api_req.js');

module.exports = (ticker, res) => {
  //DO NOT DELETE THIS!!!!!!
  // Promise.all([
  //   apiReq('data_point', ticker, "ticker,name,52_week_high,52_week_low,marketcap,basiceps,volume,average_daily_volume,open_price,close_price,change,beta,short_description"),
  //   apiReq('financials', ticker)
  //   ])
  // .then((data) => {
  //   let flatData = data.reduce( (prev, curr) => Object.assign(prev, curr));
  //   res.send({data: flatData});
  // })
  // .catch(err => {
  //   throw err;
  // })
  
  //dummy data below: 
  const data1 = [
    {
      "tag": "revenuegrowth",
      "value": 0.513833
    },
    {
      "tag": "nopat",
      "value": 5990592743.8
    },
    {
      "tag": "nopatmargin",
      "value": 0.270321
    },
    {
      "tag": "investedcapital",
      "value": 27090000000
    },
    {
      "tag": "investedcapitalturnover",
      "value": 0.8432
    },
    {
      "tag": "investedcapitalincreasedecrease",
      "value": 1614000000
    },
    {
      "tag": "freecashflow",
      "value": 4376592743.8
    },
    {
      "tag": "netnonopex",
      "value": -31407256.2
    },
    {
      "tag": "netnonopobligations",
      "value": -23293000000
    },
    {
      "tag": "ebit",
      "value": 8820000000
    },
    {
      "tag": "depreciationandamortization",
      "value": 2166000000
    },
    {
      "tag": "ebitda",
      "value": 10986000000
    },
    {
      "tag": "capex",
      "value": 3599000000
    },
    {
      "tag": "dfcfnwc",
      "value": 1506000000
    },
    {
      "tag": "dfnwc",
      "value": 24799000000
    },
    {
      "tag": "nwc",
      "value": 24799000000
    },
    {
      "tag": "debt",
      "value": 0
    },
    {
      "tag": "ltdebtandcapleases",
      "value": 0
    },
    {
      "tag": "netdebt",
      "value": -23293000000
    },
    {
      "tag": "totalcapital",
      "value": 50383000000
    },
    {
      "tag": "bookvaluepershare",
      "value": 17.3495
    },
    {
      "tag": "tangbookvaluepershare",
      "value": 10.145
    },
    {
      "tag": "marketcap",
      "value": 331869120000
    },
    {
      "tag": "enterprisevalue",
      "value": 308576120000
    },
    {
      "tag": "pricetobook",
      "value": 6.5869
    },
    {
      "tag": "pricetotangiblebook",
      "value": 11.2647
    },
    {
      "tag": "pricetorevenue",
      "value": 14.9754
    },
    {
      "tag": "pricetoearnings",
      "value": 55.33
    },
    {
      "tag": "dividendyield",
      "value": 0
    },
    {
      "tag": "earningsyield",
      "value": 0.018073
    },
    {
      "tag": "evtoinvestedcapital",
      "value": 11.3908
    },
    {
      "tag": "evtorevenue",
      "value": 13.9243
    },
    {
      "tag": "evtoebitda",
      "value": 28.0881
    },
    {
      "tag": "evtoebit",
      "value": 34.986
    },
    {
      "tag": "evtonopat",
      "value": 51.5101
    },
    {
      "tag": "evtoocf",
      "value": 27.5514
    },
    {
      "tag": "evtofcff",
      "value": 70.506
    },
    {
      "tag": "ebitdagrowth",
      "value": 0.746027
    },
    {
      "tag": "ebitgrowth",
      "value": 0.895144
    },
    {
      "tag": "nopatgrowth",
      "value": 1.150516
    },
    {
      "tag": "netincomegrowth",
      "value": 1.199416
    },
    {
      "tag": "epsgrowth",
      "value": 1.132653
    },
    {
      "tag": "ocfgrowth",
      "value": 0.746997
    },
    {
      "tag": "fcffgrowth",
      "value": 1.243491
    },
    {
      "tag": "investedcapitalgrowth",
      "value": 0.063354
    },
    {
      "tag": "revenueqoqgrowth",
      "value": 0.121111
    },
    {
      "tag": "ebitdaqoqgrowth",
      "value": 0.172841
    },
    {
      "tag": "ebitqoqgrowth",
      "value": 0.203767
    },
    {
      "tag": "nopatqoqgrowth",
      "value": 0.282955
    },
    {
      "tag": "netincomeqoqgrowth",
      "value": 0.285105
    },
    {
      "tag": "epsqoqgrowth",
      "value": 0.282209
    },
    {
      "tag": "ocfqoqgrowth",
      "value": 0.133374
    },
    {
      "tag": "fcffqoqgrowth",
      "value": 0.281815
    },
    {
      "tag": "investedcapitalqoqgrowth",
      "value": 0.021147
    },
    {
      "tag": "grossmargin",
      "value": 0.851135
    },
    {
      "tag": "ebitdamargin",
      "value": 0.495736
    },
    {
      "tag": "operatingmargin",
      "value": 0.395921
    },
    {
      "tag": "ebitmargin",
      "value": 0.397996
    },
    {
      "tag": "profitmargin",
      "value": 0.271739
    },
    {
      "tag": "costofrevtorevenue",
      "value": 0.148865
    },
    {
      "tag": "sgaextorevenue",
      "value": 0.211994
    },
    {
      "tag": "rdextorevenue",
      "value": 0.24322
    },
    {
      "tag": "opextorevenue",
      "value": 0.455214
    },
    {
      "tag": "taxburdenpct",
      "value": 0.682766
    },
    {
      "tag": "interestburdenpct",
      "value": 1
    },
    {
      "tag": "efftaxrate",
      "value": 0.317234
    },
    {
      "tag": "assetturnover",
      "value": 0.4438
    },
    {
      "tag": "arturnover",
      "value": 9.6018
    },
    {
      "tag": "invturnover",
      "value": "nm"
    },
    {
      "tag": "faturnover",
      "value": 3.6754
    },
    {
      "tag": "apturnover",
      "value": 9.6603
    },
    {
      "tag": "dso",
      "value": 38.0136
    },
    {
      "tag": "dio",
      "value": 0
    },
    {
      "tag": "dpo",
      "value": 37.7834
    },
    {
      "tag": "ccc",
      "value": 0.2302
    },
    {
      "tag": "finleverage",
      "value": -0.4149
    },
    {
      "tag": "leverageratio",
      "value": 1.1117
    },
    {
      "tag": "compoundleveragefactor",
      "value": 1.1117
    },
    {
      "tag": "ltdebttoequity",
      "value": 0
    },
    {
      "tag": "debttoequity",
      "value": 0
    },
    {
      "tag": "roic",
      "value": 0.227927
    },
    {
      "tag": "nnep",
      "value": 0.001685
    },
    {
      "tag": "roicnnepspread",
      "value": 0.226241
    },
    {
      "tag": "rnnoa",
      "value": -0.093859
    },
    {
      "tag": "roe",
      "value": 0.134068
    },
    {
      "tag": "croic",
      "value": 0.166518
    },
    {
      "tag": "oroa",
      "value": 0.176631
    },
    {
      "tag": "roa",
      "value": 0.120598
    },
    {
      "tag": "noncontrollinginterestsharingratio",
      "value": 0
    },
    {
      "tag": "roce",
      "value": 0.134068
    },
    {
      "tag": "divpayoutratio",
      "value": 0
    },
    {
      "tag": "augmentedpayoutratio",
      "value": 0
    },
    {
      "tag": "ocftocapex",
      "value": 3.111976
    },
    {
      "tag": "stdebttocap",
      "value": 0
    },
    {
      "tag": "ltdebttocap",
      "value": 0
    },
    {
      "tag": "debttototalcapital",
      "value": 0
    },
    {
      "tag": "preferredtocap",
      "value": 0
    },
    {
      "tag": "noncontrolinttocap",
      "value": 0
    },
    {
      "tag": "commontocap",
      "value": 1
    },
    {
      "tag": "debttoebitda",
      "value": 0
    },
    {
      "tag": "netdebttoebitda",
      "value": 0
    },
    {
      "tag": "ltdebttoebitda",
      "value": 0
    },
    {
      "tag": "debttonopat",
      "value": 0
    },
    {
      "tag": "netdebttonopat",
      "value": 0
    },
    {
      "tag": "ltdebttonopat",
      "value": 0
    },
    {
      "tag": "altmanzscore",
      "value": 38.9663
    },
    {
      "tag": "ebittointerestex",
      "value": "nm"
    },
    {
      "tag": "nopattointerestex",
      "value": "nm"
    },
    {
      "tag": "ebitlesscapextointerestex",
      "value": "nm"
    },
    {
      "tag": "nopatlesscapextointex",
      "value": "nm"
    },
    {
      "tag": "ocftointerestex",
      "value": "nm"
    },
    {
      "tag": "ocflesscapextointerestex",
      "value": "nm"
    },
    {
      "tag": "fcfftointerestex",
      "value": "nm"
    },
    {
      "tag": "currentratio",
      "value": 12.2162
    },
    {
      "tag": "quickratio",
      "value": 11.8019
    },
    {
      "tag": "dfcfnwctorev",
      "value": 0.067957
    },
    {
      "tag": "dfnwctorev",
      "value": 1.119038
    },
    {
      "tag": "nwctorev",
      "value": 1.119038
    },
    {
      "tag": "normalizednopat",
      "value": 5990592743.8
    },
    {
      "tag": "normalizednopatmargin",
      "value": 0.270321
    },
    {
      "tag": "pretaxincomemargin",
      "value": 0.397996
    }
  ]
  const data2 = [
    {
      "identifier": "FB",
      "item": "ticker",
      "value": "FB"
    },
    {
      "identifier": "FB",
      "item": "name",
      "value": "Facebook Inc"
    },
    {
      "identifier": "FB",
      "item": "52_week_high",
      "value": 131.98
    },
    {
      "identifier": "FB",
      "item": "52_week_low",
      "value": 88.01
    },
    {
      "identifier": "FB",
      "item": "marketcap",
      "value": 371857200000
    },
    {
      "identifier": "FB",
      "item": "basiceps",
      "value": 2.12
    },
    {
      "identifier": "FB",
      "item": "volume",
      "value": 8311907
    },
    {
      "identifier": "FB",
      "item": "average_daily_volume",
      "value": 14017693
    },
    {
      "identifier": "FB",
      "item": "open_price",
      "value": 129.23
    },
    {
      "identifier": "FB",
      "item": "close_price",
      "value": 128.05
    },
    {
      "identifier": "FB",
      "item": "change",
      "value": -1.18
    },
    {
      "identifier": "FB",
      "item": "beta",
      "value": 0.7459
    },
    {
      "identifier": "FB",
      "item": "short_description",
      "value": "Facebook, Inc. operates as a mobile application and Website that enables people to connect, share, discover, and communicate each other on mobile devices and personal computers worldwide."
    }
  ]
  let elements = data1.reduce((all, obj) => {
    all[obj.tag] = obj.value;
    return all;
  }, {})
  elements = data2.reduce((all, obj) => {
    all[obj.item] = obj.value;
    return all;
  }, elements)

  elements.ticker = ticker;
  elements.name = "Company, co."
    console.log(elements)
    res.send({data: elements});

};
