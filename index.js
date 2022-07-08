const DATA_COUNT = 4;
const NUMBER_CFG = {count: DATA_COUNT, min: 20, max: 100};

const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
};

var _seed = Date.now();

function rand(min, max) {
  min = valueOrDefault(min, 0);
  max = valueOrDefault(max, 0);
  _seed = (_seed * 9301 + 49297) % 233280;
  return min + (_seed / 233280) * (max - min);
}

function valueOrDefault(value, defaultValue) {
  return typeof value === 'undefined' ? defaultValue : value;
}

function numbers(config) {
  var cfg = config || {};
  var min = valueOrDefault(cfg.min, 0);
  var max = valueOrDefault(cfg.max, 100);
  var from = valueOrDefault(cfg.from, []);
  var count = valueOrDefault(cfg.count, 8);
  var decimals = valueOrDefault(cfg.decimals, 8);
  var continuity = valueOrDefault(cfg.continuity, 1);
  var dfactor = Math.pow(10, decimals) || 0;
  var data = [];
  var i, value;

  for (i = 0; i < count; ++i) {
    value = (from[i] || 0) + rand(min, max);
    if (rand() <= continuity) {
      data.push(Math.round(dfactor * value) / dfactor);
    } else {
      data.push(null);
    }
  }

  return data;
}

const data = {
  labels: ['Red', 'Yellow', 'Green', 'Blue'],
  datasets: [
    {
      label: 'Dataset 1',
      data: numbers(NUMBER_CFG),
      backgroundColor: Object.values(CHART_COLORS),
			borderWidth: [
				0, 0
			]
    }
  ]
};

Chart.defaults.elements.arc.borderWidth = 0;
Chart.defaults.elements.arc.roundedCornersFor = {
  "start": 0, //0th position of Label 1
  "end": 1 //2nd position of Label 2
};

Chart.defaults.elements.arc.hoverBorderColor = 'white';
Chart.defaults.datasets.doughnut.cutout = '80%';

const config = {
	type : 'doughnut',
	data: data,
	options: {
		responsive: true,
		plugins: {
			legend: {
				position: false,
			},
			title: {
				display: false,
				text: 'Chart.js Doughnut Chart'
			},
		}
	},
	plugins: [{
    afterUpdate: function(chart) {
      if (chart.options.elements.arc.roundedCornersFor !== undefined) {
        var arcValues = Object.values(chart.options.elements.arc.roundedCornersFor);

        [0,1,2,3].forEach(function(i) {
					var arc = chart.getDatasetMeta(0).data[i];
					arc.round = {
						x: (chart.chartArea.left + chart.chartArea.right) / 2,
						y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
						radius: (arc.outerRadius + arc.innerRadius) / 2,
						thickness: (arc.outerRadius - arc.innerRadius) / 2,
						backgroundColor: arc.options.backgroundColor
					}
				});
      }
    },
    afterDraw: (chart) => {

      if (chart.options.elements.arc.roundedCornersFor !== undefined) {
        var {
          ctx,
          canvas
        } = chart;
        var arc,
          roundedCornersFor = chart.options.elements.arc.roundedCornersFor;
        for (var position in roundedCornersFor) {
          var values = Array.isArray(roundedCornersFor[position]) ? roundedCornersFor[position] : [roundedCornersFor[position]];
          values.forEach(p => {
            arc = chart.getDatasetMeta(0).data[p];
            var startAngle = Math.PI / 2 - arc.startAngle;
            var endAngle = Math.PI / 2 - arc.endAngle;
            ctx.save();
            ctx.translate(arc.round.x, arc.round.y);
            ctx.fillStyle = arc.options.backgroundColor;
            ctx.beginPath();
            if (position == "start") {
              ctx.arc(arc.round.radius * Math.sin(startAngle), arc.round.radius * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
            } else {
              ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
          });

        };
      }
    }
  }]
};

const myChart = new Chart(
    document.getElementById('myChart'),
    config
);