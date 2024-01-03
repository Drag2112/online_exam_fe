import { ChartBase } from '../../shared';
import { LineChartConfig } from '../../../config/app.config';
import moment from 'moment';
import './ChartView.scss';

var CanvasJSChart = ChartBase.CanvasJSChart;

const ChartView = (props) => {
    const { chartType, points } = props

    const options = {
        animationEnabled: true,
        theme: 'light2',
        height: 350,
        title: {
            text: LineChartConfig[chartType].title,
            fontFamily: 'IBM Plex Sans',
            fontWeight: 600,
            fontSize: 15,
            margin: 30,
            horizontalAlign: 'left'
        },
        dataPointWidth: 30,
        axisX: {
            title: LineChartConfig[chartType].xAxis,
            titleFontFamily: 'IBM Plex Sans',
            titleFontWeight: 600,
            titleFontSize: 14,
            lineThickness: 0,
            lineColor: '#828282',
            labelAngle: -30,
            labelFontSize: 13,
            labelFontFamily: 'IBM Plex Sans',
            labelAutoFit: true,
            labelTextAlign: 'center',
        },
        axisY: {
            title: LineChartConfig[chartType].yAxis,
            titleFontFamily: 'IBM Plex Sans',
            titleFontWeight: 600,
            titleFontSize: 15,
            gridThickness: 1,
            gridColor: '#d4d4d4',
            lineThickness: 0,
            lineColor: '#828282',
            labelAngle: 0,
            labelFontSize: 13,
            labelFontFamily: 'IBM Plex Sans',
            labelFontWeight: 500,
            tickLength: 0,
        },
        toolTip: {
			cornerRadius: 4,    // set border radius of tooltip frame
            fontSize: 13,
            fontFamily: 'IBM Plex Sans',
            contentFormatter: function (e) {
				var content = ''
				for (var i = 0; i < e.entries.length; i++) {
					content += `<strong>${LineChartConfig[chartType].toolTipHeader}</strong>: ` + `${e.entries[i].dataPoint.label}` + '<hr/>'
					content += `<strong>${LineChartConfig[chartType].toolTipFooter}</strong>: ` + e.entries[i].dataPoint.y
				}
				return content;
			}
		},
        data: [{
            type: 'column', 
            cursor: 'pointer',  
            color: '#81c4eb',   // set column color
            dataPoints: points
        }]
    }

    return (
        <div className='chart-view-container'>
            <CanvasJSChart options = {options} />
            <div className='chart-view-unlock-trial'></div>
        </div>
    )
}

export default ChartView;