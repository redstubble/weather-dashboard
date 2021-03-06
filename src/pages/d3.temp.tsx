import React, { Component, useState } from "react";
import { Container, Form, Checkbox } from "semantic-ui-react";
import * as d3Selection from "d3-selection";
import { nest } from "d3-collection";
import { select } from "d3-selection";
import { timeParse, timeFormat } from "d3-time-format";
import * as d3Time from "d3-time";
import * as d3Array from "d3-array";
import * as d3Scale from "d3-scale";
import * as d3ScaleChromatic from "d3-scale-chromatic";
import * as d3Shape from "d3-shape";
import * as d3Axis from "d3-axis";
import { canvas } from "../utils/d3-helpers";

const graphDiv = ".graph-canvas";

function TempDashboard() {
  const [weatherData, setWeatherData] = useState();
  const [canvas, setCanvas] = useState();
  const [d3populated, setd3populated] = useState(false);

  const clearGraph = () => {
    select(graphDiv).selectAll("*").remove();
  };

  // const populateWeather = async () => {
  //   const w = await this.getWeatherData();
  //   if (w && w.apiResults.results.length > 0) {
  //     const weatherData = await this.getWeatherData();
  //     setWeatherData(weatherData);
  //     this.setState({
  //       canvas: this.scaffoldCanvas(),
  //     });
  //     this.populateGraph();
  //   }
  // };

  // componentDidUpdate = () => {
  //   if (this.state.select === "weather" && !this.state.d3populated) {
  //     this.setState({
  //       d3populated: true,
  //     });
  //     this.populateWeather();
  //   }
  //   if (this.state.select === "clear" && this.state.d3populated) {
  //     debugger;
  //     this.setState({
  //       d3populated: false,
  //     });
  //     d3Selection.select(graphDiv).selectAll("svg").remove();
  //   }
  // };

  //   // const result = {
  //   //   ...weatherData,
  //   //   apiResults: {
  //   //     ...weatherData.apiResults,
  //   //     results: weatherResults,
  //   //   },
  //   // };
  // };

  // const scaffoldCanvas = () => {
  //   const containerDiv = document.getElementById("graph-canvas-weather");
  //   const width = containerDiv?.clientWidth ?? 0;
  //   const height = containerDiv?.clientHeight ?? 0;
  //   var svg = d3Selection
  //     .select(graphDiv)
  //     .append("svg")
  //     .attr("height", height)
  //     .attr("width", width);
  //   const x = width - (canvas.margin.left + canvas.margin.right);
  //   const y = height - (canvas.margin.top + canvas.margin.bottom);
  //   const node = svg
  //     .append("g")
  //     .attr(
  //       "transform",
  //       "translate(" + canvas.margin.left + "," + canvas.margin.top + ")"
  //     );
  //   const dataset = nest()
  //     .key(function (d: any) {
  //       return d.name;
  //     })
  //     .rollup(function (d: any) {
  //       return d[0];
  //     })
  //     .entries(this.state.weatherData.apiResults.results);
  //   return {
  //     ...canvas,
  //     ...{
  //       x,
  //       y,
  //       node,
  //       dataset,
  //     },
  //   };
  // };

  // populateGraph = () => {
  //   var _timeParse = timeParse("%Y-%m-%dT%H:%M");
  //   var formatTime = timeFormat("%Y-%m-%dT%H:%M");
  //   var arr = this.state.canvas.dataset[0].value.forecast;
  //   var range = [
  //     d3Array.extent(this.state.canvas.dataset[0].value.forecast, function (d) {
  //       return new Date(d.dateTime * 1000);
  //     }),
  //   ];

  //   var x = d3Scale
  //     .scaleTime()
  //     .range([0, this.state.canvas.x])
  //     .domain(range[0]);

  //   var tempVariance = d3Collection
  //     .nest()
  //     .key(function (d) {
  //       return d3Array.max(d.value.forecast, function (d) {
  //         return d.temp;
  //       });
  //     })
  //     .map(this.state.canvas.dataset)
  //     .keys();

  //   var highestTemp = d3Array.max(tempVariance);
  //   var lowestTemp = d3Array.min(tempVariance);

  //   var y = d3Scale
  //     .scaleLinear()
  //     .range([this.state.canvas.y, 0])
  //     .domain([lowestTemp - 50, highestTemp]);

  //   var z = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10).domain(
  //     this.state.weatherData.apiResults.results.map(function (d) {
  //       return d.name;
  //     })
  //   );

  //   var line = d3Shape
  //     .line()
  //     // .interpolate('basis')
  //     .curve(d3Shape.curveNatural)
  //     //   .curve(d3.curveStepAfter)
  //     .x(function (d) {
  //       return x(new Date(d.dateTime * 1000));
  //     })
  //     .y(function (d) {
  //       return y(d.temp);
  //     });

  //   var area = d3Shape
  //     .area()
  //     .curve(d3Shape.curveStepAfter)
  //     .x(function (d) {
  //       return x(new Date(d.dateTime * 1000));
  //     })
  //     .y0(this.state.canvas.x)
  //     .y1(function (d) {
  //       return y(d.temp);
  //     });

  //   var lineGraph = this.state.canvas.node.append("g");

  //   var location = this.state.canvas.node
  //     .append("g")
  //     .selectAll(".location")
  //     .data(this.state.weatherData.apiResults.results)
  //     .enter()
  //     .append("g")
  //     .attr("class", "location");

  //   location
  //     .append("path")
  //     .attr("class", "line")
  //     .attr("d", function (d) {
  //       return line(d.forecast);
  //     })
  //     .style("stroke", function (d) {
  //       return z(d.name);
  //     })
  //     .attr("fill", "none");
  //   this.state.canvas.node
  //     .append("g")
  //     .attr("class", "axis axis--x")
  //     .attr("transform", "translate(0," + this.state.canvas.y + ")")
  //     .call(
  //       d3Axis.axisBottom(x).tickFormat(function (d) {
  //         var formatMillisecond = d3TimeFormat.timeFormat(".%L"),
  //           formatSecond = d3TimeFormat.timeFormat(":%S"),
  //           formatMinute = d3TimeFormat.timeFormat("%H:%M"),
  //           formatHour = d3TimeFormat.timeFormat("%H:00"),
  //           formatDay = d3TimeFormat.timeFormat("%a %d"),
  //           formatWeek = d3TimeFormat.timeFormat("%b %d"),
  //           formatMonth = d3TimeFormat.timeFormat("%B"),
  //           formatYear = d3TimeFormat.timeFormat("%Y"),
  //           multiFormat = function (date) {
  //             return (d3Time.timeSecond(date) < date
  //               ? formatMillisecond
  //               : d3Time.timeMinute(date) < date
  //               ? formatSecond
  //               : d3Time.timeHour(date) < date
  //               ? formatMinute
  //               : d3Time.timeDay(date) < date
  //               ? formatHour
  //               : d3Time.timeMonth(date) < date
  //               ? d3Time.timeWeek(date) < date
  //                 ? formatDay
  //                 : formatWeek
  //               : d3Time.timeYear(date) < date
  //               ? formatMonth
  //               : formatYear)(date);
  //           };
  //         return multiFormat(d);
  //       })
  //     );

  //   this.state.canvas.node
  //     .append("g")
  //     .attr("class", "axis y-axis")
  //     .call(
  //       d3Axis
  //         .axisLeft(y)
  //         .ticks(
  //           Math.min(
  //             Math.round(Math.floor(this.state.canvas.y / 35) + 1),
  //             highestTemp
  //           ),
  //           ".0f"
  //         )
  //     )
  //     .append("text")
  //     .attr(
  //       "transform",
  //       "rotate(-90) translate(" +
  //         -(this.state.canvas.y / 2) +
  //         ", " +
  //         -this.state.canvas.margin.left * 0.8 +
  //         ")"
  //     )
  //     .attr("class", "label")
  //     .attr("text-anchor", "middle")
  //     .style("font-weight", "normal")
  //     .style("font-size", "12px")
  //     .attr("y", 6)
  //     .attr("dy", ".35em")
  //     .attr("fill", "#666")
  //     .text("Temp °C");
  //   this.state.canvas.node.selectAll(".y-axis g text").attr("fill", "#666");
  //   this.state.canvas.node.selectAll(".y-axis g line").attr("stroke", "#666");
  // };

  return (
    <Container>
      <div className="App">
        <div className="header">
          <h3 className="text-muted">D3 Implementations</h3>
        </div>
        <div
          style={{
            textAlign: "center",
            borderBottom: "1px solid #e5e5e5",
            padding: "0",
            minHeight: "300px",
          }}
          className="jumbotron graph-canvas"
          id="graph-canvas-weather"
        />
        <div className="bs-callout bs-callout-danger">
          <h4>Line Graph of Temperature Forecasts</h4>
          <p>To add labeling, area fill and hover</p>
        </div>
      </div>
    </Container>
  );
}

export { TempDashboard };
