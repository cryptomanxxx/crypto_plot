function T(UNIX_timestamp) {
  var MyDate = new Date(UNIX_timestamp * 1000);
  var MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2);
  return JSON.stringify(MyDateString);
}


function GetData() {
  var ApiKey = "ddd85b386e1a7c889e468a4933f75f22f52b0755b747bdb637ab39c88a3bc19b";
  var url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD&api_key=" + ApiKey;

  $.get(url, callback1);
}


function callback1(x) {
  var y = x.Data;
  var A = [];

  var select = document.getElementById("MyBox");

  for (var i = 0; i < y.length; i++) {
    A.push([y[i].CoinInfo.Name]);
    var el = document.createElement("option");
    el.textContent = y[i].CoinInfo.Name;
    el.value = y[i].CoinInfo.Name;
    select.appendChild(el);
  }
}


function Selection(sel) {
  var ticker = sel.value;
  window.ticker = ticker;
  var ApiKey = "ddd85b386e1a7c889e468a4933f75f22f52b0755b747bdb637ab39c88a3bc19b";
  var url = "https://min-api.cryptocompare.com/data/histoday?fsym=" + ticker + "&tsym=USD&limit=500&api_key=" + ApiKey;
  $.get(url, callback2);
}


function callback2(x) {
  var y = x.Data;

  var D1 = [];
  var D2 = [];

  for (var i = 0; i < y.length; i++) {
    D1.push(T(y[i].time));
    D2.push(y[i].close);
  }

  Plot(D1, D2);
}


function Plot(xxx, yyy) {
  var xx = xxx;
  var yy = yyy;

  var data = [{
    x: xx,
    y: yy,
    type: 'scatter',
    line: { color: 'blue', width: 2 }

  }];

  var c = 'white';

  var layout =
  {
    title: { text: 'Crypto currency price chart for : ' + window.ticker, font: { family: 'Courier New, monospace', size: 22, color: c } },
    autosize: true,
    width: 900,
    margin: { b: 120 },
    paper_bgcolor: '#000000',
    plot_bgcolor: '#000000',
    xaxis: { tickmode: "linear", dtick: 40, tickformat: "%Y-%m-%d", tickangle: 45, tickfont: { size: 10, color: c }, linecolor: c, zeroline: false },
    yaxis: { tickfont: { size: 10, color: c }, linecolor: c, zeroline: false }
  };

  Plotly.newPlot('mydiv', data, layout, { displayModeBar: false });
}

