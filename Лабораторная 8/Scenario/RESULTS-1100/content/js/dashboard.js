/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 93.09144218435037, "KoPercent": 6.908557815649624};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6658878504672897, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "/index.php?route=checkout/cart/add-13"], "isController": false}, {"data": [0.95, 500, 1500, "/index.php-21"], "isController": false}, {"data": [0.4365, 500, 1500, "/index.php-8"], "isController": false}, {"data": [0.5, 500, 1500, "/3d-proektory-dlya-doma-9"], "isController": false}, {"data": [0.848, 500, 1500, "/dopolnitelnoe-oborudovanie/sidm-opcii-12"], "isController": false}, {"data": [0.945, 500, 1500, "/index.php-20"], "isController": false}, {"data": [0.7142857142857143, 500, 1500, "/index.php-17-0"], "isController": false}, {"data": [0.83225, 500, 1500, "/videoochki-11"], "isController": false}, {"data": [0.42857142857142855, 500, 1500, "/index.php-17-1"], "isController": false}, {"data": [0.74425, 500, 1500, "/pos-oborudovanie/displei-pokupatelya-10"], "isController": false}, {"data": [0.805, 500, 1500, "/index.php-18"], "isController": false}, {"data": [0.7, 500, 1500, "/index.php-17"], "isController": false}, {"data": [0.58, 500, 1500, "/index.php-16"], "isController": false}, {"data": [0.425, 500, 1500, "/index.php-15"], "isController": false}, {"data": [0.035, 500, 1500, "/index.php-14"], "isController": false}, {"data": [0.935, 500, 1500, "/index.php-19"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 10914, 754, 6.908557815649624, 9311.753161077493, 39, 173145, 290.0, 7756.0, 18890.0, 163080.95, 56.36203076827738, 91.31320067644508, 26.74771912004689], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/index.php?route=checkout/cart/add-13", 100, 70, 70.0, 66843.6, 3563, 161877, 6562.0, 161624.2, 161723.85, 161876.34, 0.5964309571524, 1.1751961419117998, 0.10204560907529345], "isController": false}, {"data": ["/index.php-21", 100, 0, 0.0, 233.7600000000001, 41, 1364, 124.5, 664.1000000000013, 1164.6499999999999, 1363.2999999999997, 0.6501274249752952, 0.5111626878868258, 0.311096131091694], "isController": false}, {"data": ["/index.php-8", 2000, 635, 31.75, 38630.73050000004, 41, 173145, 4057.0, 162100.10000000003, 163023.75, 163375.0, 10.360654378930573, 24.61219483825723, 3.7220195554113698], "isController": false}, {"data": ["/3d-proektory-dlya-doma-9", 2000, 43, 2.15, 5699.887500000012, 39, 173142, 1179.5, 9693.9, 11835.899999999996, 163217.54, 10.609516736512653, 18.9629259555196, 5.294791224603469], "isController": false}, {"data": ["/dopolnitelnoe-oborudovanie/sidm-opcii-12", 2000, 0, 0.0, 511.3085000000006, 40, 8958, 150.0, 1233.0, 1528.0, 4797.64, 11.49128099054842, 15.984068865092363, 5.835416128012871], "isController": false}, {"data": ["/index.php-20", 100, 0, 0.0, 209.95000000000002, 50, 1723, 118.0, 474.3000000000003, 951.9999999999998, 1723.0, 0.6501485589457191, 0.5225886497877265, 0.30539204770790124], "isController": false}, {"data": ["/index.php-17-0", 7, 0, 0.0, 677.2857142857143, 51, 1184, 760.0, 1184.0, 1184.0, 1184.0, 0.10471674121501338, 0.06514117593160501, 0.05491493167232636], "isController": false}, {"data": ["/videoochki-11", 2000, 0, 0.0, 668.2340000000006, 41, 10017, 240.0, 1415.3000000000006, 3516.099999999986, 8912.87, 11.002613120616147, 14.529584565396782, 5.576519735937285], "isController": false}, {"data": ["/index.php-17-1", 7, 0, 0.0, 1398.5714285714287, 95, 3181, 968.0, 3181.0, 3181.0, 3181.0, 0.10465098895184559, 0.4021938397942861, 0.05426726087249025], "isController": false}, {"data": ["/pos-oborudovanie/displei-pokupatelya-10", 2000, 0, 0.0, 906.473, 41, 11655, 296.0, 2073.100000000001, 4177.249999999997, 7516.9, 10.720296737813703, 15.263074825661173, 5.559060124784254], "isController": false}, {"data": ["/index.php-18", 100, 0, 0.0, 517.1800000000001, 41, 2669, 331.0, 1280.7, 1405.7999999999997, 2661.409999999996, 0.6445416986251925, 0.5223179612823802, 0.2700277233498121], "isController": false}, {"data": ["/index.php-17", 100, 0, 0.0, 788.6200000000005, 46, 4366, 442.5, 1526.0, 2117.049999999999, 4365.37, 0.6359785802414174, 0.6660633482364314, 0.3566013881027487], "isController": false}, {"data": ["/index.php-16", 100, 0, 0.0, 1144.3100000000009, 59, 7445, 783.0, 2692.0, 3144.5999999999963, 7439.999999999997, 0.6116245359298833, 0.5673653776169885, 0.2831152637019187], "isController": false}, {"data": ["/index.php-15", 100, 0, 0.0, 3446.1099999999988, 141, 11221, 988.0, 10668.9, 10839.75, 11220.49, 0.5934577220718796, 1.40892890524854, 0.3077402836134454], "isController": false}, {"data": ["/index.php-14", 100, 6, 6.0, 14324.179999999998, 1178, 163789, 3486.0, 11926.6, 162556.95, 163788.82, 0.5965199028865598, 0.5574490143254255, 0.23381949084043688], "isController": false}, {"data": ["/index.php-19", 100, 0, 0.0, 299.04999999999995, 42, 1252, 201.0, 740.6000000000004, 1155.499999999999, 1251.8999999999999, 0.6484621719591988, 0.5766500525254359, 0.2716701872758752], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 226, 29.97347480106101, 2.070734835990471], "isController": false}, {"data": ["504/Gateway Time-out", 1, 0.13262599469496023, 0.00916254352208173], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 527, 69.89389920424404, 4.8286604361370715], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 10914, 754, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 527, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 226, "504/Gateway Time-out", 1, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["/index.php?route=checkout/cart/add-13", 100, 70, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 39, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 31, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["/index.php-8", 2000, 635, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 440, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 195, "", "", "", "", "", ""], "isController": false}, {"data": ["/3d-proektory-dlya-doma-9", 2000, 43, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 42, "504/Gateway Time-out", 1, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/index.php-14", 100, 6, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 6, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
