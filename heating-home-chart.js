var dynamicChart;
var channelsLoaded = 0;
// put your ThingSpeak Channel#, Channel Name, and API keys here.
// fieldList shows which field you want to load, and which axis to display that field on, 
// the 'T' Temperature left axis, or the 'O' Other right axis.
var channelKeys =[];
channelKeys.push({channelNumber:264486, name:'Heating',key:'',
   fieldList:[
      {field:1,axis:'Q'},
      {field:2,axis:'Q'},
      {field:3,axis:'Q'},
      //{field:4,axis:'Q'},
      {field:5,axis:'T'},
      {field:6,axis:'T'},
      {field:7,axis:'T'},
      {field:8,axis:'T'}
    ]});
 
var myOffset = new Date().getTimezoneOffset();
function getChartDate(d) {    
    return Date.UTC(d.substring(0,4), d.substring(5,7)-1, d.substring(8,10), d.substring(11,13), d.substring(14,16), d.substring(17,19)) - (myOffset * 60000);
}   
function HideAll(){
	for (var index=0; index<dynamicChart.series.length; index++)  // iterate through each series
	{ 
		if (dynamicChart.series[index].name == 'Navigator')
		  continue;
		dynamicChart.series[index].hide();
	}            
}

      //  This is where the chart is generated.
$(document).ready(function() 
{
 //Add Channel Load Menu
 var menu=document.getElementById("Channel Select");
 for (var channelIndex=0; channelIndex<channelKeys.length; channelIndex++)  // iterate through each channel
 {
   window.console && console.log('Name',channelKeys[channelIndex].name);
   var menuOption =new Option(channelKeys[channelIndex].name,channelIndex);
   menu.options.add(menuOption,channelIndex);
 }
 var last_date; // variable for the last date added to the chart
 window.console && console.log('Testing console');
 //make series numbers for each field
 var seriesCounter=0
 for (var channelIndex=0; channelIndex<channelKeys.length; channelIndex++)  // iterate through each channel
  {
    for (var fieldIndex=0; fieldIndex<channelKeys[channelIndex].fieldList.length; fieldIndex++)  // iterate through each channel
      {
        channelKeys[channelIndex].fieldList[fieldIndex].series = seriesCounter; 
        seriesCounter++;
      }
  }
 //make calls to load data from each channel into channelKeys array now
 // draw the chart when all the data arrives, later asyncronously add history
 for (var channelIndex=0; channelIndex<channelKeys.length; channelIndex++)  // iterate through each channel
  {
    channelKeys[channelIndex].loaded = false;  
    loadThingSpeakChannel(channelIndex,channelKeys[channelIndex].channelNumber,channelKeys[channelIndex].key,channelKeys[channelIndex].fieldList);
    
  }
 //window.console && console.log('Channel Keys',channelKeys);
 
 // load the most recent 2500 points (fast initial load) from a ThingSpeak channel into a data[] array and return the data[] array
 function loadThingSpeakChannel(sentChannelIndex,channelNumber,key,sentFieldList) {
   var fieldList= sentFieldList;
   var channelIndex = sentChannelIndex;
   // get the Channel data with a webservice call
 	$.getJSON('https://www.thingspeak.com/channels/'+channelNumber+'/feed.json?&amp;offset=0&amp;results=2500;key='+key, function(data) 
   {
	   // if no access
	   if (data == '-1') {
       $('#chart-container').append('This channel is not public.  To embed charts, the channel must be public or a read key must be specified.');
       window.console && console.log('Thingspeak Data Loading Error');
     }
     for (var fieldIndex=0; fieldIndex<fieldList.length; fieldIndex++)  // iterate through each field
     {
       fieldList[fieldIndex].data =[];
       for (var h=0; h<data.feeds.length; h++)  // iterate through each feed (data point)
       {
         var p = []//new Highcharts.Point();
         var fieldStr = "data.feeds["+h+"].field"+fieldList[fieldIndex].field;
		  	 var v = eval(fieldStr);
 		  	p[0] = getChartDate(data.feeds[h].created_at);
	 	  	p[1] = parseFloat(v);
	 	  	// if a numerical value exists add it
	   		if (!isNaN(parseInt(v))) { fieldList[fieldIndex].data.push(p); }
       }
       fieldList[fieldIndex].name = eval("data.channel.field"+fieldList[fieldIndex].field);
	   }
     window.console && console.log('getJSON field name:',fieldList[0].name);
     channelKeys[channelIndex].fieldList=fieldList;
     channelKeys[channelIndex].loaded=true;
     channelsLoaded++;
     window.console && console.log('channels Loaded:',channelsLoaded);
     window.console && console.log('channel index:',channelIndex);
     if (channelsLoaded==channelKeys.length){createChart();}
	 })
   .fail(function() { alert('getJSON request failed! '); });
 }
 // create the chart when all data is loaded
 function createChart() {
	// specify the chart options
	var chartOptions = {
		chart: 
			{
			renderTo: 'chart-container',
			backgroundColor: null,
			zoomType:'xy',
			events: 
			{
			load: function() 
			{
				  if ('true' === 'true' && (''.length < 1 && ''.length < 1 && ''.length < 1 && ''.length < 1 && ''.length < 1)) 
			{
            // If the update checkbox is checked, get latest data every 15 seconds and add it to the chart
						setInterval(function() 
            {
             if (document.getElementById("Update").checked)
             {
              for (var channelIndex=0; channelIndex<channelKeys.length; channelIndex++)  // iterate through each channel
              {  
               (function(channelIndex)
               {
                // get the data with a webservice call
                $.getJSON('https://www.thingspeak.com/channels/'+channelKeys[channelIndex].channelNumber+'/feed/last.json?callback=?&amp;offset=0&amp;location=false;key='+channelKeys[channelIndex].key, function(data) 
                { 
                  for (var fieldIndex=0; fieldIndex<channelKeys[channelIndex].fieldList.length; fieldIndex++)
                  {
                    // if data exists
                    var fieldStr = "data.field"+channelKeys[channelIndex].fieldList[fieldIndex].field;
                    var chartSeriesIndex=channelKeys[channelIndex].fieldList[fieldIndex].series;
                    if (data && eval(fieldStr)) 
                    {
                      var p = []//new Highcharts.Point();
                      var v = eval(fieldStr);
                      p[0] = getChartDate(data.created_at);
                      p[1] = parseFloat(v);
                      // get the last date if possible
                      if (dynamicChart.series[chartSeriesIndex].data.length > 0) 
                      { 
                        last_date = dynamicChart.series[chartSeriesIndex].data[dynamicChart.series[chartSeriesIndex].data.length-1].x; 
                      }
                      var shift = false ; //default for shift
                      // if a numerical value exists and it is a new date, add it
                      if (!isNaN(parseInt(v)) && (p[0] != last_date)) 
                      {
                        dynamicChart.series[chartSeriesIndex].addPoint(p, true, shift);
                      }   
                    }                    
                  }     
                });
               })(channelIndex);
              }
             }
						}, 15000);
					}
				}
			}
		},
		rangeSelector: {
			buttons: [{
				count: 3,
				type: 'hour',
				text: '3H'
			}, {
				count: 12,
				type: 'hour',
				text: '12H'
			}, {
				count: 1,
				type: 'day',
				text: 'D'
			}, {
				count: 3,
				type: 'day',
				text: '3D'
			}, {
				count: 1,
				type: 'week',
				text: 'W'
			}, {
				count: 1,
				type: 'month',
				text: 'M'
			}, {
				count: 1,
				type: 'year',
				text: 'Y'
			}, {
				type: 'all',
				text: 'All'
			}],
			inputEnabled: true,
			selected: 1
		},
		title: {
			text: 'My home Heating history',
			style: {
				//color: 'black',
				fontSize: '16px',
				fontWeight: 'bold'
			}
		},
		plotOptions: {
			line: {gapSize:5},
			series: {
				marker: {radius: 2},
				animation: true,
				step: false,
				turboThrehold:1000,
				borderWidth: 0
			}
		},
		tooltip: {
			shared: true,
			valueDecimals: 2,
			valueSuffix: ' ',
			xDateFormat:'%A, %Y %b %e, <br/> %H:%M:%S'			
		},
		xAxis: {
			type: 'datetime',
			min: Date.UTC(2013,02,28),
			title: {
				text: ''   //x axis bottom title
			}
		},
		yAxis: [
                    {
                        labels: {format: '{value} °C', style: {color: "#000000"} }
                        ,title: {text: 'Temperature'}
                        //,opposite: false
                        ,id: 'T'
                    }
                    , 
                    {
                        labels: {format: '{value}', style: {color: "#000000"} }
                        ,title: {text: '' }
                        ,opposite: false
                        ,id: 'Q'
                    }                    
                ],
        scrollbar: {enabled: false},
		exporting: {enabled: true, csv: { dateFormat: '%d/%m/%Y %I:%M:%S %p'  } },
		legend: {enabled: true},
		navigator: {
					  baseSeries: 0,  //select which series to show in history navigator, First series is 0
					  series: {includeInCSVExport: false}
				  }, 
		series: []     
	};

	// add all Channel data to the chart
  for (var channelIndex=0; channelIndex<channelKeys.length; channelIndex++)  // iterate through each channel
  {
    for (var fieldIndex=0; fieldIndex<channelKeys[channelIndex].fieldList.length; fieldIndex++)  // add each field
    {
      window.console && console.log('Channel '+channelIndex+' field '+fieldIndex);
      chartOptions.series.push({data:channelKeys[channelIndex].fieldList[fieldIndex].data,
                                index:channelKeys[channelIndex].fieldList[fieldIndex].series,
                                yAxis:channelKeys[channelIndex].fieldList[fieldIndex].axis,
                                //visible:false,
                              name: channelKeys[channelIndex].fieldList[fieldIndex].name
                          });
    }
  }
	// set chart labels here so that decoding occurs properly
	//chartOptions.title.text = data.channel.name;
	//chartOptions.xAxis.title.text = 'Date';

	// draw the chart
  dynamicChart = new Highcharts.StockChart(chartOptions);

  // update series number to account for the navigator series (The historical series at the bottom) which is the first series.
  for (var channelIndex=0; channelIndex<channelKeys.length; channelIndex++)  // iterate through each channel
  {
    for (var fieldIndex=0; fieldIndex<channelKeys[channelIndex].fieldList.length; fieldIndex++)  // and each field
    {
      for (var seriesIndex=0; seriesIndex<dynamicChart.series.length; seriesIndex++)  // compare each series name
      {
        if (dynamicChart.series[seriesIndex].name == channelKeys[channelIndex].fieldList[fieldIndex].name)
        {
          channelKeys[channelIndex].fieldList[fieldIndex].series = seriesIndex;
        }
      }
    }
  }          
  // add all history
  //dynamicChart.showLoading("Loading History..." );
  window.console && console.log('Channels: ',channelKeys.length);
  for (var channelIndex=0; channelIndex<channelKeys.length; channelIndex++)  // iterate through each channel
  {
    window.console && console.log('channelIndex: ',channelIndex);
    (function(channelIndex)
      {
        //load only 1 set of 8000 points
        loadChannelHistory(channelIndex,channelKeys[channelIndex].channelNumber,channelKeys[channelIndex].key,channelKeys[channelIndex].fieldList,0,1); 
      }
    )(channelIndex);
  }
 }
});
      
function loadOneChannel(){ 
  // load a channel selected in the popUp menu.
  var selectedChannel=document.getElementById("Channel Select");
  var maxLoads=document.getElementById("Loads").value ;
  var channelIndex = selectedChannel.selectedIndex;
  loadChannelHistory(channelIndex,channelKeys[channelIndex].channelNumber,channelKeys[channelIndex].key,channelKeys[channelIndex].fieldList,0,maxLoads); 
} 

// load next 8000 points from a ThingSpeak channel and addPoints to a series
function loadChannelHistory(sentChannelIndex,channelNumber,key,sentFieldList,sentNumLoads,maxLoads) {
   var numLoads=sentNumLoads
   var fieldList= sentFieldList;
   var channelIndex = sentChannelIndex;
   var first_Date = new Date();
   if (typeof fieldList[0].data[0] != "undefined") first_Date.setTime(fieldList[0].data[0][0]+7*60*60*1000);//adjust for 7 hour difference from GMT (Zulu time)
   else if (typeof fieldList[1].data[0] != "undefined") first_Date.setTime(fieldList[1].data[0][0]+7*60*60*1000);
   else if (typeof fieldList[2].data[0] != "undefined") first_Date.setTime(fieldList[2].data[0][0]+7*60*60*1000);
   else if (typeof fieldList[3].data[0] != "undefined") first_Date.setTime(fieldList[3].data[0][0]+7*60*60*1000);
   else if (typeof fieldList[4].data[0] != "undefined") first_Date.setTime(fieldList[4].data[0][0]+7*60*60*1000);
   else if (typeof fieldList[5].data[0] != "undefined") first_Date.setTime(fieldList[5].data[0][0]+7*60*60*1000);
   else if (typeof fieldList[6].data[0] != "undefined") first_Date.setTime(fieldList[6].data[0][0]+7*60*60*1000);
   else if (typeof fieldList[7].data[0] != "undefined") first_Date.setTime(fieldList[7].data[0][0]+7*60*60*1000);
   var end = first_Date.toJSON();
   window.console && console.log('earliest date:',end);
   window.console && console.log('sentChannelIndex:',sentChannelIndex);
   window.console && console.log('numLoads:',numLoads);
   // get the Channel data with a webservice call
 	$.getJSON('https://www.thingspeak.com/channels/'+channelNumber+'/feed.json?callback=?&amp;offset=0&amp;start=2013-01-20T00:00:00;end='+end+';key='+key, function(data) 
   {
	   // if no access
	   if (data == '-1') {
       $('#chart-container').append('This channel is not public.  To embed charts, the channel must be public or a read key must be specified.');
       window.console && console.log('Thingspeak Data Loading Error');
     }
     for (var fieldIndex=0; fieldIndex<fieldList.length; fieldIndex++)  // iterate through each field
     {
       //fieldList[fieldIndex].data =[];
       for (var h=0; h<data.feeds.length; h++)  // iterate through each feed (data point)
       {
         var p = []//new Highcharts.Point();
         var fieldStr = "data.feeds["+h+"].field"+fieldList[fieldIndex].field;
		  	 var v = eval(fieldStr);
 		  	p[0] = getChartDate(data.feeds[h].created_at);
	 	  	p[1] = parseFloat(v);
	 	  	// if a numerical value exists add it
	   		if (!isNaN(parseInt(v))) { fieldList[fieldIndex].data.push(p); }
       }
       fieldList[fieldIndex].data.sort(function(a,b){return a[0]-b[0]});
       dynamicChart.series[fieldList[fieldIndex].series].setData(fieldList[fieldIndex].data,false);
       //dynamicChart.series[fieldList[fieldIndex].series].addPoint(fieldList[fieldIndex].data,false);
       //fieldList[fieldIndex].name = eval("data.channel.field"+fieldList[fieldIndex].field);
       //window.console && console.log('data added to series:',fieldList[fieldIndex].series,fieldList[fieldIndex].data);
	   }
     channelKeys[channelIndex].fieldList=fieldList;
     dynamicChart.redraw()
     window.console && console.log('channel index:',channelIndex);
     numLoads++;
     if (numLoads<maxLoads) {loadChannelHistory(channelIndex,channelNumber,key,fieldList,numLoads,maxLoads);}
	 });
}
