function formatNum(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
states = [
	"Total", "Maharashtra", "Gujarat", "Delhi", "Rajasthan", "Madhya Pradesh", "Tamil Nadu", "Uttar Pradesh", "Andhra Pradesh", "Telangana", "West Bengal", "Jammu and Kashmir", "Katnataka", "Kerala", "Punjab", "Haryana", "Bihar", "Odisha", "Jharkhand", "Uttarakhand", "Himachal Pradesh", "Chhattisgarh", "Assam", "Chandigarh", "Andaman and Nicobar", "Ladakh", "Meghalaya", "Puducherry", "Goa", "Manipur", "Tripura", "Mizoram", "Arunachal Pradesh", "Nagaland", "Dadra and Nagar Haveli", "Daman and Diu", "Lakshadweep", "Sikkim"
]
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
    	output += "<tr><td>" + states[i] + "</td><td>" + formatNum(data.statewise[i].confirmed) + "</td><td>" + formatNum(data.statewise[i].active) + "</td><td>" + formatNum(data.statewise[i].recovered) + "</td><td>" + formatNum(data.statewise[i].deaths) + "</td></tr>";
    }
    document.getElementById('loading').style.display = "none";
    document.getElementById('dataTable').innerHTML = output;

    //document.getElementById('totalConfirmed').dataCount = formatNum(data.statewise[0].confirmed);
    document.getElementById('totalActive').innerHTML = formatNum(data.statewise[0].active);
    document.getElementById('totalRecovered').innerHTML = formatNum(data.statewise[0].recovered);
    document.getElementById('totalDeaths').innerHTML = formatNum(data.statewise[0].deaths);
});
