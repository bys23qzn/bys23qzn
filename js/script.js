document.addEventListener('DOMContentLoaded', function () {
    // Load bar chart data and render
    d3.json('./data/dataset.json').then(data => {
        const chart = d3.select('#bar-chart');
        const barWidth = 0.5;
        const chartWidth = barWidth * data.length;
        const chartHeight = 5;

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([0, chartHeight]);

        chart.selectAll('a-box')
            .data(data)
            .enter()
            .append('a-box')
            .attr('position', (d, i) => `${-chartWidth / 2 + i * barWidth} ${yScale(d.value) / 2} 0`)
            .attr('width', barWidth)
            .attr('height', d => yScale(d.value))
            .attr('depth', barWidth)
            .attr('color', 'tomato')
            .attr('event-set__mouseenter', '_event: mouseenter; color: #EF2D5E')
            .attr('event-set__mouseleave', '_event: mouseleave; color: tomato');
    }).catch(error => {
        console.error('Error loading the bar chart dataset:', error);
    });

    // Load line chart data and render
    d3.json('./data/linechart_data.json').then(data => {
        const chart = d3.select('#line-chart');
        const lineData = data.map((d, i) => [i, d.value, Math.sin(i)]);

        for (let i = 0; i < lineData.length - 1; i++) {
            chart.append('a-entity')
                .attr('line', {
                    start: `${lineData[i][0]} ${lineData[i][1]} ${lineData[i][2]}`,
                    end: `${lineData[i + 1][0]} ${lineData[i + 1][1]} ${lineData[i + 1][2]}`,
                    color: 'blue'
                });
        }
    }).catch(error => {
        console.error('Error loading the line chart dataset:', error);
    });

    // Load scatter plot data and render
    d3.json('./data/scatterplot_data.json').then(data => {
        const scatterPlot = d3.select('#scatter-plot');
        const chartHeight = 5;

        scatterPlot.selectAll('a-sphere')
            .data(data)
            .enter()
            .append('a-sphere')
            .attr('position', d => `${d.x} ${d.y / chartHeight * 2.5} ${d.z}`)
            .attr('radius', 0.1)
            .attr('color', 'green')
            .attr('event-set__mouseenter', '_event: mouseenter; color: #00FF00')
            .attr('event-set__mouseleave', '_event: mouseleave; color: green');
    }).catch(error => {
        console.error('Error loading the scatter plot dataset:', error);
    });
});
