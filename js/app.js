function formatNum(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
states = {
	TT: "Total",
    MH: "Maharashtra",
    GJ: "Gujarat",
    DL: "Delhi",
    RJ: "Rajasthan", 
    MP: "Madhya Pradesh",
    TN: "Tamil Nadu",
    UP: "Uttar Pradesh",
    AP: "Andhra Pradesh",
    TG: "Telangana",
    WB: "West Bengal",
    JK: "Jammu and Kashmir",
    KA: "Karnataka",
    KL: "Kerala",
    PB: "Punjab",
    HR: "Haryana",
    BR: "Bihar",
    OR: "Odisha",
    JH: "Jharkhand",
    UT: "Uttarakhand",
    UT: "Himachal Pradesh",
    CT: "Chhattisgarh", 
    AS: "Assam",
    CH: "Chandigarh",
    AN: "Andaman and Nicobar",
    LA: "Ladakh",
    ML: "Meghalaya",
    PY: "Puducherry",
    GA: "Goa",
    MN: "Manipur",
    TR: "Tripura",
    MZ: "Mizoram",
    AR: "Arunachal Pradesh",
    NL: "Nagaland",
    DN: "Dadra and Nagar Haveli",
    DD: "Daman and Diu",
    LD: "Lakshadweep",
    SK: "Sikkim"
}
totalConfirmed = 0
totalDeaths = 0

fetch('https://api.covid19india.org/data.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    output = '<tr><th>State/UT</th><th>Confirmed</th><th>Active</th><th>Recovered</th><th>Deaths</th></tr>'
    for(i = 1; i < 38; i++) {
    	output += "<tr><td>" + states[data.statewise[i].statecode] + "</td><td>" + formatNum(data.statewise[i].confirmed) + "</td><td>" + formatNum(data.statewise[i].active) + "</td><td>" + formatNum(data.statewise[i].recovered) + "</td><td>" + formatNum(data.statewise[i].deaths) + "</td></tr>";
    }
    document.getElementById('loading').style.display = "none";
    document.getElementById('dataTable').innerHTML = output;

    // Total Report
    document.getElementById('totalConfirmed').innerHTML = formatNum(data.statewise[0].confirmed);
    document.getElementById('totalActive').innerHTML = formatNum(data.statewise[0].active);
    document.getElementById('totalRecovered').innerHTML = formatNum(data.statewise[0].recovered);
    document.getElementById('totalDeaths').innerHTML = formatNum(data.statewise[0].deaths);

    // Yesterday's Report
    latestDate = data.cases_time_series.length-1;
    document.getElementById('yUntilCases').innerHTML = data.cases_time_series[latestDate].totalconfirmed;
    document.getElementById('yConfirmed').innerHTML = data.cases_time_series[latestDate].dailyconfirmed;
    document.getElementById('yRecovered').innerHTML = data.cases_time_series[latestDate].dailyrecovered;
    document.getElementById('yDeaths').innerHTML = data.cases_time_series[latestDate].dailydeceased;

    new_cases = parseInt(data.statewise[0].confirmed)-parseInt(data.cases_time_series[latestDate].totalconfirmed);
    if(new_cases > 0)
        new_cases = "+" + new_cases
    document.getElementById('new_cases').innerHTML = "[" + new_cases + "]";
    
    currConf = parseInt(data.statewise[0].confirmed) - parseInt(data.cases_time_series[latestDate].totalconfirmed);
    currRec = parseInt(data.statewise[0].recovered) - parseInt(data.cases_time_series[latestDate].totalrecovered);
    currDec = parseInt(data.statewise[0].deaths) - parseInt(data.cases_time_series[latestDate].totaldeceased);

    document.getElementById('todayStats').innerHTML = '<p>Since 12 AM today,</p><p>a total of <span style="color:red;"><b>' + currConf + '</b></span> new cases were found.</p><p><span style="color: green;"><b>' + currRec + '</b></span> recovered,</p><p>and <span style="color:gray;"><b>' + currDec + '</b></span> deaths were reported.</p>';
});
