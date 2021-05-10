var configSourceSPD, sourceSPDChart, spectralEfficiencyFunctionDataset, configSPD, spdChart, configCRM, crmChart, configChromaticity, chromaticityChart, dataTestZero, dataTestNan, combinesSourceDataset, sourceWavelengths, sourceValues;

$(document).ready(function(){
	// Source SPD
	Chart.defaults.global.defaultFontSize = 20;
	Chart.defaults.global.defaultFontColor = 'black';
	Chart.defaults.global.defaultFontFamily = 'Source Sans Pro';

	var ctxSourceSPD = document.getElementById("source-spd").getContext("2d");
	configSourceSPD = {
		type: 'scatter',
		data: {
			datasets: [
				
			]
		},
		options: {
			responsive: true,
			spanGaps: true,
			legend: {
				display: false
			},
			tooltips: {
      	callbacks: {
					label: function(tooltipItem, data) {
						var label = data.datasets[tooltipItem.datasetIndex].label;
						return label;
					}
         }
       },
			scales: {
				yAxes: [{
					id: 'y-axis-1',
					position: 'left',
					ticks: {
						min: 0,
						max: 1
					},
					scaleLabel: {
						display: true,
						labelString: 'Relative Spectral Power (%)'
					}
				}],
				xAxes: [{
					ticks: {
						autoSkip: true,
						min: 350,
						max: 750,
						stepSize: 25,
					},
					scaleLabel: {
						display: true,
						labelString: 'Wavelength (nm)'
					}
				}]
		},
			elements: {
				point: {
					radius: 0,
					hitRadius: 5,
				}
			},
		}
	}
	sourceSPDChart = new Chart(ctxSourceSPD, configSourceSPD);


	// SPD
	var ctxSPD = document.getElementById("spdPlot").getContext("2d");

	dataTestNan = [];
	for(var k = 0;k < setwavelength.length;k++){
		dataTestNan[k] = {
			x: setwavelength[k],
			y: NaN,
		};
	}
	dataTestZero = [];
	for(k = 0; k < setwavelength.length; k++){
		dataTestZero[k] = {
			x: setwavelength[k],
			y: 0,
		};
	}

	combinedSourceDataset = {
		label: 'Combined Source SPD',
		fill: false,
		lineTension: 0.1,
		backgroundColor: "rgba(75,192,192,1)",
		borderColor: "rgba(75,192,192,1)",
		borderCapStyle: 'butt',
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: 'miter',
		pointBorderColor: "rgba(75,192,192,1)",
		pointBackgroundColor: "#fff",
		pointBorderWidth: 1,
		radius: 0,
		data: dataTestNan,
		yAxisID: 'y-axis-1',
	};

	spectralEfficiencyFunctionDataset = {
		label: 'Circadian Stimulus Spectral Efficiency Response',
		fill: false,
		lineTension: 0.1,
		backgroundColor: "rgba(75,192,192,1)",
		borderColor: "rgba(75,192,192,1)",
		borderCapStyle: 'butt',
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: 'miter',
		pointBorderColor: "rgba(75,192,192,1)",
		pointBackgroundColor: "#fff",
		pointBorderWidth: 1,
		radius: 0,
		data: dataTestNan,
		yAxisID: 'y-axis-2',
	};

	configSPD = {
	  type: 'scatter',
		data: {
			datasets: [
				//combinedSPD
			]
		},
		options: {
			responsive: true,
			spanGaps: true,
			legend: {
				display: false,
			},
			tooltips: {
      	callbacks: {
					label: function(tooltipItem, data) {
						var label = data.datasets[tooltipItem.datasetIndex].label;
						return label;
					}
         }
       },
			scales: {
				yAxes: [{
					id: 'y-axis-1',
					position: 'left',
					ticks: {
						min: -0.4,
						max: 1
					},
					scaleLabel: {
						display: true,
						labelString: 'Relative Spectral Power (%)'
					}
				},
				{
					display: false,
					id: 'y-axis-2',
					position: 'right',
					ticks: {
						min: -0.4,
						max: 1
					},
					scaleLabel: {
						display: false,
						labelString: 'Relative Spectral Contribution of Circadian Response*',
					}
				}],
				xAxes: [{
					ticks: {
						autoSkip: true,
						min: 350,
						max: 750,
						stepSize: 25,
					},
					scaleLabel: {
						display: true,
						labelString: 'Wavelength (nm)',
					}
				}]
		},
			elements: {
				point: {
					radius: 0,
					hitRadius: 5,
				}
			}
		}
	};
	spdChart = new Chart(ctxSPD,configSPD);
	document.getElementById('spdLegend').innerHTML = spdChart.generateLegend();
	// SPD

	// CRM
	var ctxCRM = document.getElementById("crmPlot").getContext("2d");

	var crmTargetAreaDataset = {
		label: 'Recommended Range of Class A Color',
		fill: false,
		lineTension: 0.1,
		backgroundColor: "rgba(192,0,0,1)",
		borderColor: "rgba(192,0,0,1)",
		pointBorderColor: "rgba(182,0,0,1)",
		pointRadius: 0,
		showLine: true,
		data: [{
			x: 80,
			y: 100,
		},{
			x: 100,
			y: 100,
		},{
			x: 100,
			y: 80,
		},{
			x: 80,
			y: 80,
		},{
			x: 80,
			y: 100,
		}],
	};

	var combinedSourceCRMDataset = {
		label: 'Combined Source',
		fill: false,
		lineTension: 0.1,
		backgroundColor: "rgba(75,192,192,1)",
		borderColor: "rgba(75,192,192,1)",
		pointBorderColor: "rgba(75,192,192,1)",
		pointRadius: 5,
		pointHoverRadius: 10,
		showLine: false,
		data: [{
			x: NaN,
			y: NaN,
		}]
	};

	configCRM = {
		type: 'scatter',
		data: {
			//labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100],
			datasets: [
				combinedSourceCRMDataset,
				crmTargetAreaDataset,
			]
		},
		options: {
			responsive: true,
			spanGaps: true,
			legend: {
				display: false,
			},
			tooltips: {
	            callbacks: {
					title: function(tooltipItems, data) {
						var label = data.datasets[tooltipItems[0].datasetIndex].label;
						return label;
					},
	                label: function(tooltipItem, data) {
						var wavelengthStr = 'CRI: ' + tooltipItem.xLabel.toFixed(2);
						var valueStr = 'GAI: ' + tooltipItem.yLabel.toFixed(2);
						return [wavelengthStr, valueStr];
					}
	            }
	        },
			scales: {
				yAxes: [{
					position: 'left',
					ticks: {
						min: 0,
						max: 140,
						stepSize: 20,
					},
					scaleLabel: {
						display: true,
						labelString: 'Gamut Area Index (GAI)',
					}
				}],
				xAxes: [{
					position: 'bottom',
					ticks: {
						autoSkip: true,
						min: 20,
						max: 100,
						stepSize: 20,
					},
					scaleLabel: {
						display: true,
						labelString: 'Color Rendering Index (CRI)',
					},
				}]
			},
			elements: {
				point: {
				}
			},
		}
	};
	crmChart = new Chart(ctxCRM,configCRM);
	document.getElementById('crmLegend').innerHTML = crmChart.generateLegend();
	// CRM

	// Chromaticity
	var ctxChromaticity = document.getElementById("chromaticityPlot").getContext("2d");

	var chromaticityBBDataset = {
		label: 'Black Body Curve',
		fill: false,
		lineTension: 0.1,
		backgroundColor: "rgba(100,100,100,1)",
		borderColor: "rgba(100,100,100,1)",
		pointBorderColor: "rgba(100,100,100,1)",
		pointRadius: 0,
		showLine: true,
		data: [{
			x: 0.63875877,
			y: 0.35649556,
		},{
			x: 0.62504744,
			y: 0.36745216,
		},{
			x: 0.61163429,
			y: 0.37723035,
		},{
			x: 0.61163429,
			y: 0.37723035,
		},{
			x: 0.59852404,
			y: 0.38578639,
		},{
			x: 0.59852404,
			y: 0.38578639,
		},{
			x: 0.58572099,
			y: 0.39311969,
		},{
			x: 0.57323277,
			y: 0.39926276,
		},{
			x: 0.56107068,
			y: 0.40427271,
		},{
			x: 0.5492485,
			y: 0.40822386,
		},{
			x: 0.53778072,
			y: 0.41120145,
		},{
			x: 0.52668099,
			y: 0.41329646,
		},{
			x: 0.51596083,
			y: 0.41460147,
		},{
			x: 0.50562884,
			y: 0.41520751,
		},{
			x: 0.49569033,
			y: 0.41520177,
		},{
			x: 0.48614721,
			y: 0.41466606,
		},{
			x: 0.47699814,
			y: 0.41367584,
		},{
			x: 0.46823886,
			y: 0.41229983,
		},{
			x: 0.45986258,
			y: 0.41059984,
		},{
			x: 0.45186037,
			y: 0.40863095,
		},{
			x: 0.44422164,
			y: 0.40644182,
		},{
			x: 0.43693448,
			y: 0.40407515,
		},{
			x: 0.42998605,
			y: 0.40156813,
		},{
			x: 0.42336291,
			y: 0.39895299,
		},{
			x: 0.41705125,
			y: 0.39625751,
		},{
			x: 0.41103713,
			y: 0.3935055,
		},{
			x: 0.40530668,
			y: 0.39071725,
		},{
			x: 0.39984619,
			y: 0.38790999,
		},{
			x: 0.39464228,
			y: 0.38509828,
		},{
			x: 0.38968196,
			y: 0.38229431,
		},{
			x: 0.38495268,
			y: 0.37950827,
		},{
			x: 0.38044236,
			y: 0.37674859,
		},{
			x: 0.37613949,
			y: 0.37402219,
		},{
			x: 0.37203303,
			y: 0.3713347,
		},{
			x: 0.36811252,
			y: 0.36869065,
		},{
			x: 0.364368,
			y: 0.36609358,
		},{
			x: 0.36079006,
			y: 0.36354627,
		},{
			x: 0.35736976,
			y: 0.36105079,
		},{
			x: 0.35409868,
			y: 0.35860861,
		},{
			x: 0.35096887,
			y: 0.35622074,
		},{
			x: 0.34797281,
			y: 0.35388774,
		},{
			x: 0.34510343,
			y: 0.35160985,
		},{
			x: 0.34235406,
			y: 0.34938699,
		},{
			x: 0.33971842,
			y: 0.34721886,
		},{
			x: 0.33719058,
			y: 0.34510495,
		},{
			x: 0.33476499,
			y: 0.34304458,
		},{
			x: 0.33243638,
			y: 0.34103694,
		},{
			x: 0.33019983,
			y: 0.33908112,
		},{
			x: 0.32805067,
			y: 0.33717611,
		},{
			x: 0.32598453,
			y: 0.33532084,
		},{
			x: 0.32399728,
			y: 0.33351421,
		},{
			x: 0.32208503,
			y: 0.33175506,
		},{
			x: 0.32024411,
			y: 0.3300422,
		},{
			x: 0.31847107,
			y: 0.32837445,
		},{
			x: 0.31676264,
			y: 0.32675062,
		},{
			x: 0.31511576,
			y: 0.32516949,
		},{
			x: 0.31352751,
			y: 0.32362989,
		},{
			x: 0.31199516,
			y: 0.32213063,
		},{
			x: 0.31051613,
			y: 0.32067056,
		},{
			x: 0.30908796,
			y: 0.31924852,
		},{
			x: 0.30770835,
			y: 0.31786338,
		},{
			x: 0.30637511,
			y: 0.31651406,
		},{
			x: 0.30508617,
			y: 0.31519947,
		},{
			x: 0.30383958,
			y: 0.31391856,
		},{
			x: 0.30263349,
			y: 0.3126703,
		},{
			x: 0.30146613,
			y: 0.3114537,
		},{
			x: 0.30033586,
			y: 0.31026779,
		},{
			x: 0.29924109,
			y: 0.30911162,
		},{
			x: 0.29818032,
			y: 0.30798429,
		},{
			x: 0.29715215,
			y: 0.3068849,
		},{
			x: 0.29615522,
			y: 0.30581259,
		},{
			x: 0.29518825,
			y: 0.30476653,
		},{
			x: 0.29425004,
			y: 0.30374592,
		},{
			x: 0.29333942,
			y: 0.30274997,
		},{
			x: 0.29245529,
			y: 0.30177793,
		},{
			x: 0.29159662,
			y: 0.30082906,
		},{
			x: 0.29076241,
			y: 0.29990266,
		},{
			x: 0.28995172,
			y: 0.29899805,
		},{
			x: 0.28916363,
			y: 0.29811457,
		},{
			x: 0.2883973,
			y: 0.29725157,
		},{
			x: 0.28765191,
			y: 0.29640845,
		},{
			x: 0.28692667,
			y: 0.2955846,
		},{
			x: 0.28622084,
			y: 0.29477946,
		},{
			x: 0.28553371,
			y: 0.29399245,
		},{
			x: 0.2848646,
			y: 0.29322306,
		},{
			x: 0.28421286,
			y: 0.29247075,
		},{
			x: 0.28357788,
			y: 0.29173504,
		},{
			x: 0.28295906,
			y: 0.29101542,
		},{
			x: 0.28235584,
			y: 0.29031145,
		},{
			x: 0.28176767,
			y: 0.28962265,
		},{
			x: 0.28119405,
			y: 0.28894861,
		},{
			x: 0.28063446,
			y: 0.28828889,
		},{
			x: 0.28008844,
			y: 0.28764309,
		},{
			x: 0.27955554,
			y: 0.28701082,
		},{
			x: 0.27903531,
			y: 0.28639169,
		},{
			x: 0.27852734,
			y: 0.28578533,
		},{
			x: 0.27803123,
			y: 0.2851914,
		},{
			x: 0.2775466,
			y: 0.28460955,
		},{
			x: 0.27707308,
			y: 0.28403944,
		},{
			x: 0.2766103,
			y: 0.28348076,
		},{
			x: 0.27615795,
			y: 0.28293319,
		},{
			x: 0.27571568,
			y: 0.28239643,
		},{
			x: 0.27528318,
			y: 0.28187019,
		},{
			x: 0.27486016,
			y: 0.2813542,
		},{
			x: 0.27444632,
			y: 0.28084818,
		},{
			x: 0.27404139,
			y: 0.28035186,
		},{
			x: 0.2736451,
			y: 0.279865,
		},{
			x: 0.27325718,
			y: 0.27938734,
		},{
			x: 0.2728774,
			y: 0.27891864,
		},{
			x: 0.27250551,
			y: 0.27845868,
		},{
			x: 0.27214129,
			y: 0.27800724,
		},{
			x: 0.27178451,
			y: 0.27756408,
		},{
			x: 0.27143496,
			y: 0.27712901,
		},{
			x: 0.27109243,
			y: 0.27670182,
		},{
			x: 0.27075673,
			y: 0.27628232,
		},{
			x: 0.27042766,
			y: 0.27587031,
		},{
			x: 0.27010504,
			y: 0.2754656,
		},{
			x: 0.26978869,
			y: 0.27506802,
		},{
			x: 0.26947844,
			y: 0.2746774,
		},{
			x: 0.26917413,
			y: 0.27429356,
		},{
			x: 0.26887559,
			y: 0.27391634,
		},{
			x: 0.26858268,
			y: 0.27354559,
		},{
			x: 0.26829523,
			y: 0.27318114,
		},{
			x: 0.26801311,
			y: 0.27282285,
		},{
			x: 0.26773617,
			y: 0.27247058,
		}],
	};

	var chromaticitySpectrumLocusDataset = {
		label: 'Spectrum Locus',
		fill: false,
		lineTension: 0.1,
		backgroundColor: "purple",//"rgba(100,100,100,1)",
		borderColor: "purple",//"rgba(100,100,100,1)",
		pointBorderColor: "purple",//"rgba(100,100,100,1)",
		pointRadius: 0,
		showLine: true,
		data: [{
			x: 0.174112256586483,
			y: 0.00496372661321115,
		},{
			x: 0.174007917515889,
			y: 0.00498054862299504,
		},{
			x: 0.173800772620828,
			y: 0.00491541190537341,
		},{
			x: 0.173559906527214,
			y: 0.00492320257730789,
		},{
			x: 0.173336865480781,
			y: 0.00479674344726689,
		},{
			x: 0.173020965455495,
			y: 0.00477505036185929,
		},{
			x: 0.172576550848802,
			y: 0.00479930191972077,
		},{
			x: 0.172086630755248,
			y: 0.00483252421803995,
		},{
			x: 0.171407433863109,
			y: 0.00510217097374933,
		},{
			x: 0.170300988779736,
			y: 0.00578850499647099,
		},{
			x: 0.168877520670989,
			y: 0.00690024388793052,
		},{
			x: 0.16689529035208,
			y: 0.00855560636081898,
		},{
			x: 0.164411756375275,
			y: 0.0108575582767639,
		},{
			x: 0.161104579580275,
			y: 0.0137933588217324,
		},{
			x: 0.156640932577307,
			y: 0.0177048049908913,
		},{
			x: 0.150985408375971,
			y: 0.022740193291643,
		},{
			x: 0.143960396039604,
			y: 0.0297029702970297,
		},{
			x: 0.135502671199611,
			y: 0.0398791214721278,
		},{
			x: 0.124118476727786,
			y: 0.0578025133737405,
		},{
			x: 0.10959432361561,
			y: 0.0868425111830942,
		},{
			x: 0.0912935157167267,
			y: 0.132702055154113,
		},{
			x: 0.0687059102495702,
			y: 0.20072322010789,
		},{
			x: 0.0453907346747777,
			y: 0.294975964606287,
		},{
			x: 0.0234599425470795,
			y: 0.412703479093521,
		},{
			x: 0.00816802800466744,
			y: 0.538423070511752,
		},{
			x: 0.00385852090032154,
			y: 0.654823151125402,
		},{
			x: 0.0138702460850112,
			y: 0.750186428038777,
		},{
			x: 0.0388518024032043,
			y: 0.812016021361816,
		},{
			x: 0.0743024239007892,
			y: 0.83380308154829,
		},{
			x: 0.114160720795792,
			y: 0.826206968387063,
		},{
			x: 0.154722061215713,
			y: 0.805863545425649,
		},{
			x: 0.192876183315676,
			y: 0.781629130925122,
		},{
			x: 0.22961967264964,
			y: 0.754329089902744,
		},{
			x: 0.265775084971184,
			y: 0.724323924929806,
		},{
			x: 0.301603868768048,
			y: 0.692307692307692,
		},{
			x: 0.337363288970879,
			y: 0.658848333113717,
		},{
			x: 0.373101543868457,
			y: 0.624450859796661,
		},{
			x: 0.40873625546016,
			y: 0.589606868504293,
		},{
			x: 0.444062463582333,
			y: 0.554713902808531,
		},{
			x: 0.478774791157584,
			y: 0.520202307211456,
		},{
			x: 0.51248636706843,
			y: 0.486590788333007,
		},{
			x: 0.544786505594834,
			y: 0.454434114568836,
		},{
			x: 0.575151311365165,
			y: 0.424232234924905,
		},{
			x: 0.602932785575716,
			y: 0.396496633572977,
		},{
			x: 0.627036599763872,
			y: 0.372491145218418,
		},{
			x: 0.648233106013639,
			y: 0.351394916305022,
		},{
			x: 0.665763576238097,
			y: 0.334010651154761,
		},{
			x: 0.680078849721707,
			y: 0.319747217068646,
		},{
			x: 0.691516480670718,
			y: 0.30832975908197,
		},{
			x: 0.700606060606061,
			y: 0.299300699300699,
		},{
			x: 0.707566912655579,
			y: 0.291882365899328,
		},{
			x: 0.713777660695469,
			y: 0.285827186512118,
		},{
			x: 0.718825228695234,
			y: 0.280853795538437,
		},{
			x: 0.723191020244538,
			y: 0.276608538785328,
		},{
			x: 0.725992317541613,
			y: 0.274007682458387,
		},{
			x: 0.728271728271728,
			y: 0.271728271728272,
		},{
			x: 0.729969012837539,
			y: 0.270030987162461,
		},{
			x: 0.73108939558451,
			y: 0.26891060441549,
		},{
			x: 0.731993299832496,
			y: 0.268006700167504,
		},{
			x: 0.732718894009217,
			y: 0.267281105990783,
		},{
			x: 0.733416967225968,
			y: 0.266583032774032,
		},{
			x: 0.734047300312361,
			y: 0.265952699687639,
		},{
			x: 0.734390164995147,
			y: 0.265609835004853,
		},{
			x: 0.734591661642629,
			y: 0.265408338357371,
		},{
			x: 0.734687277666386,
			y: 0.265312722333614,
		},{
			x: 0.734690106450047,
			y: 0.265309893549953,
		},{
			x: 0.734690122885039,
			y: 0.265309877114961,
		},{
			x: 0.734690156003619,
			y: 0.265309843996382,
		},{
			x: 0.734690205836816,
			y: 0.265309794163185,
		},{
			x: 0.73468999960562,
			y: 0.26531000039438,
		},{
			x: 0.734689816680868,
			y: 0.265310183319132,
		},{
			x: 0.734690128944565,
			y: 0.265309871055435,
		},{
			x: 0.734690401158334,
			y: 0.265309598841666,
		},{
			x: 0.734689467835535,
			y: 0.265310532164465,
		},{
			x: 0.734689365465399,
			y: 0.265310634534601,
		},{
			x: 0.73469323905766,
			y: 0.26530676094234,
		},{
			x: 0.734689365465399,
			y: 0.265310634534601,
		},{
			x: 0.734684938364308,
			y: 0.265315061635692,
		},{
			x: 0.734689365465399,
			y: 0.265310634534601,
		},{
			x: 0.734691578960542,
			y: 0.265308421039458,
		},{
			x: 0.734690265486726,
			y: 0.265309734513274,
		},{
			x: 0.174112256586483,
			y: 0.00496372661321115,
		}]
	};

	var chromaticity2700KDataset = {
		label: '2700 K',
		fill: false,
		lineTension: 0.1,
		backgroundColor: "red",//"rgba(100,100,100,1)",
		borderColor: "red",//"rgba(100,100,100,1)",
		pointBorderColor: "red",//"rgba(100,100,100,1)",
		pointRadius: 0,
		showLine: true,
		data: [{
			x: 0.4098,
			y: 0.3208,
		},{
			x: 0.4874,
			y: 0.4598,
		}]
	};

	var chromaticity3000KDataset = {
		label: '3000 K',
		fill: false,
		lineTension: 0.1,
		backgroundColor: "orange",//"rgba(100,100,100,1)",
		borderColor: "orange",//"rgba(100,100,100,1)",
		pointBorderColor: "orange",//"rgba(100,100,100,1)",
		pointRadius: 0,
		showLine: true,
		data: [{
			x: 0.3923,
			y: 0.312,
		},{
			x: 0.463,
			y: 0.458,
		}]
	};

	var chromaticity3500KDataset = {
		label: '3500 K',
		fill: false,
		lineTension: 0.1,
		backgroundColor: "yellow",//"rgba(100,100,100,1)",
		borderColor: "yellow",//"rgba(100,100,100,1)",
		pointBorderColor: "yellow",//"rgba(100,100,100,1)",
		pointRadius: 0,
		showLine: true,
		data: [{
			x: 0.3777,
			y: 0.3166,
		},{
			x: 0.4224,
			y: 0.4365,
		}]
	};

	var chromaticity4000KDataset = {
		label: '4000 K',
		fill: false,
		lineTension: 0.1,
		backgroundColor: "green",//"rgba(100,100,100,1)",
		borderColor: "green",//"rgba(100,100,100,1)",
		pointBorderColor: "green",//"rgba(100,100,100,1)",
		pointRadius: 0,
		showLine: true,
		data: [{
			x: 0.364333595,
			y: 0.317352165,
		},{
			x: 0.398308503,
			y: 0.442624818,
		}]
	};

	var chromaticity5000KDataset = {
		label: '5000 K',
		fill: false,
		lineTension: 0.1,
		backgroundColor: "blue",//"rgba(100,100,100,1)",
		borderColor: "blue",//"rgba(100,100,100,1)",
		pointBorderColor: "blue",//"rgba(100,100,100,1)",
		pointRadius: 0,
		showLine: true,
		data: [{
			x: 0.3413,
			y: 0.3074,
		},{
			x: 0.3509,
			y: 0.415,
		}]
	};

	var combinedSourceChromaticityDataset = {
		label: 'Combined Source',
		fill: false,
		lineTension: 0.1,
		backgroundColor: "rgba(75,192,192,1)",
		borderColor: "rgba(75,192,192,1)",
		pointBorderColor: "rgba(75,192,192,1)",
		pointRadius: 5,
		pointHoverRadius: 10,
		showLine: false,
		data: [{
			x: NaN,
			y: NaN,
		}]
	};

	configChromaticity = {
		type: 'scatter',
		data: {
			datasets: [
				combinedSourceChromaticityDataset,
				chromaticityBBDataset,
				chromaticitySpectrumLocusDataset,
				chromaticity2700KDataset,
				chromaticity3000KDataset,
				chromaticity3500KDataset,
				chromaticity4000KDataset,
				chromaticity5000KDataset,
			]
		},
		options: {
			responsive: true,
			maintainAspectRatio: true,
			spanGaps: true,
			legend: {
				display: false,
			},
			tooltips: {
	            callbacks: {
					title: function(tooltipItems, data) {
						var label = data.datasets[tooltipItems[0].datasetIndex].label;
						return label;
					},
	                label: function(tooltipItem, data) {
						var wavelengthStr = 'X Coordinate: ' + tooltipItem.xLabel.toFixed(2);
						var valueStr = 'Y Coordinate: ' + tooltipItem.yLabel.toFixed(2);
						return [wavelengthStr, valueStr];
					}
	            }
	        },
			scales: {
				yAxes: [{
					position: 'left',
					ticks: {
						min: 0.00,
						max: 0.90,
						stepSize: 0.10,
					},
					scaleLabel: {
						display: true,
						labelString: 'Y',
					}
				}],
				xAxes: [{
					position: 'bottom',
					ticks: {
						autoSkip: true,
						min: 0.00,
						max: 0.90,
						stepSize: 0.10,
					},
					scaleLabel: {
						display: true,
						labelString: 'X',
					},
				}]
			},
			elements: {
				point: {
				}
			},
		}
	};
	chromaticityChart = new Chart(ctxChromaticity,configChromaticity);
	document.getElementById('chromaticityLegend').innerHTML = chromaticityChart.generateLegend();
	// Chromaticity
});
