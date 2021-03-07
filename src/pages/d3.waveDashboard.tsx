import React, { Component, useEffect, useState } from "react";
import { Container, Form, Checkbox } from "semantic-ui-react";
import { nest } from "d3-collection";
import { select } from "d3-selection";
import { timeParse, timeFormat } from "d3-time-format";
import {
  timeSecond,
  timeMinute,
  timeHour,
  timeDay,
  timeMonth,
  timeWeek,
  timeYear,
} from "d3-time";
import { max, min, extent } from "d3-array";
import { scaleOrdinal, scaleTime, scaleLinear } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { line, area, curveNatural, curveStepAfter } from "d3-shape";
import { axisBottom, axisLeft, axisRight } from "d3-axis";
import { MergedWeatherDataType, removeUndefined } from "../api/weatherData";
import { CanvasType, defaultCanvas } from "../utils/canvas";
import { svg } from "d3";
import { ElementResize } from "../components/elementResize";

const wrapperDiv = ".graph-wave-heihgt";

function WaveDashboard({
  mergedWeatherData,
}: {
  mergedWeatherData: MergedWeatherDataType[] | undefined;
}) {
  const targetId = "graph-canvas-wave-height";
  const [canvas, setCanvas] = useState<CanvasType>();
  const target = { id: targetId };
  const [width, height] = ElementResize(target);

  const clearGraph = () => {
    select(wrapperDiv).selectAll("*").remove();
  };

  useEffect(() => {
    clearGraph();
    const canvas = scaffoldCanvas();
    if (canvas) {
      setCanvas(canvas);
    }
  }, [mergedWeatherData, width]);

  useEffect(() => {
    populateGraph();
  }, [canvas]);

  const scaffoldCanvas = (): CanvasType | undefined => {
    const containerDiv = window.document.getElementById(targetId);
    if (containerDiv && mergedWeatherData) {
      const width = containerDiv?.clientWidth ?? 0;
      const height = containerDiv?.clientHeight ?? 0;
      debugger;
      const svg = select(wrapperDiv)
        .append("svg")
        .attr("height", height)
        .attr("width", width);
      const x = width - (defaultCanvas.left + defaultCanvas.right);
      const y = height - (defaultCanvas.top + defaultCanvas.bottom);
      const node = svg
        .append("g")
        .attr(
          "transform",
          "translate(" + defaultCanvas.left + "," + defaultCanvas.top + ")"
        );
      return {
        x,
        y,
        node,
      };
    }
    return undefined;
  };

  const populateGraph = () => {
    if (mergedWeatherData && canvas) {
      const data = mergedWeatherData;

      /** Time on x axis */
      const DateArr = data
        .map((d) => d.datetime ?? undefined)
        .filter(removeUndefined);
      const range = extent(DateArr) as [Date, Date];
      const x = scaleTime().range([0, canvas.x]).domain(range);

      /** Temp on y axis */
      const waveHeight = data
        .map((d) => [
          d.sea_surface_wave_maximum_height ?? undefined,
          d.sea_surface_wave_significant_height ?? undefined,
        ])
        .flat()
        .filter(removeUndefined);
      const waveHeightRange = extent(waveHeight) as [number, number];
      const [lowestWave, highestWave] = waveHeightRange;
      const y = scaleLinear()
        .range([canvas?.y ?? 0, 0])
        .domain([lowestWave, highestWave]);

      const y1 = scaleLinear()
        .range([canvas?.y ?? 0, 0])
        .domain([0, 360]);

      const _line = line<[Date, number, string]>()
        .curve(curveNatural)
        .x(function (d) {
          return x(d[0]);
        })
        .y(function (d) {
          const yAxis = y(d[1]);
          return y(d[1]);
        });

      const lineGraph = canvas.node.append("g");

      const waveMaxHeight = mergedWeatherData
        .filter((a) => a.sea_surface_wave_maximum_height)
        .map(
          (a) =>
            [a.datetime!, a.sea_surface_wave_maximum_height!, "max"] as [
              Date,
              number,
              string
            ]
        );

      const waveAvgHeight = mergedWeatherData
        .filter((a) => a.sea_surface_wave_significant_height)
        .map(
          (a) =>
            [a.datetime!, a.sea_surface_wave_significant_height!, "sig"] as [
              Date,
              number,
              string
            ]
        );

      canvas?.node
        .append("g")
        .selectAll("dot")
        .data(
          mergedWeatherData.filter(
            (d) =>
              d.sea_surface_wave_from_direction_at_variance_spectral_density_maximum
          )
        )
        .enter()
        .append("circle")
        .attr("cx", function (d: MergedWeatherDataType) {
          return x(d.datetime!);
        })
        .attr("cy", function (d: MergedWeatherDataType) {
          return y1(
            d.sea_surface_wave_from_direction_at_variance_spectral_density_maximum!
          );
        })
        .attr("r", 1.5)
        .style("fill", "red");

      canvas.node
        .append("g")
        .selectAll(".location")
        .data([waveMaxHeight, waveAvgHeight])
        .enter()
        .append("g")
        .attr("class", "location")
        .append("path")
        .attr("class", "line axisBlue")
        .attr("d", function (d) {
          const t = _line(d);
          console.log(t);
          return t;
        })
        .style("stroke", function (d) {
          if (d[0][2] === "max") {
            return "lightBlue";
          }
          return "darkBlue";
        })
        .attr("fill", "none");

      canvas?.node
        .append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + canvas.y + ")")
        .call(
          axisBottom(x).tickFormat(function (d) {
            const formatMillisecond = timeFormat(".%L"),
              formatSecond = timeFormat(":%S"),
              formatMinute = timeFormat("%H:%M"),
              formatHour = timeFormat("%H:00"),
              formatDay = timeFormat("%a %d"),
              formatWeek = timeFormat("%b %d"),
              formatMonth = timeFormat("%B"),
              formatYear = timeFormat("%Y"),
              multiFormat = function (date: Date) {
                return (timeSecond(date) < date
                  ? formatMillisecond
                  : timeMinute(date) < date
                  ? formatSecond
                  : timeHour(date) < date
                  ? formatMinute
                  : timeDay(date) < date
                  ? formatHour
                  : timeMonth(date) < date
                  ? timeWeek(date) < date
                    ? formatDay
                    : formatWeek
                  : timeYear(date) < date
                  ? formatMonth
                  : formatYear)(date);
              };
            return multiFormat(d);
          })
        );

      canvas.node
        .append("g")
        .attr("class", "axis y-axis axisBlue")
        .call(
          axisLeft(y).ticks(
            Math.min(Math.round(Math.floor(canvas.y / 35) + 1), highestWave),
            ".0f"
          )
        )
        .append("text")
        .attr(
          "transform",
          "rotate(-90) translate(" +
            -(canvas.y / 2) +
            ", " +
            -defaultCanvas.left * 0.8 +
            ")"
        )
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .style("font-weight", "normal")
        .style("font-size", "12px")
        .attr("y", 6)
        .attr("dy", ".35em")
        .attr("fill", "#666")
        .text("Height");

      canvas.node
        .append("g")
        .attr("class", "axisRed")
        .attr("transform", "translate(475, 0)")

        .call(axisLeft(y1))

        .append("text")
        .attr("fill", "red")

        .attr(
          "transform",
          "rotate(-90) translate(" +
            -(canvas.y / 2) +
            ", " +
            -defaultCanvas.left * 0.8 +
            ")"
        )
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .style("font-weight", "normal")
        .style("font-size", "12px")
        .attr("y", 6)
        .attr("dy", ".35em")
        .attr("fill", "red")
        .text("Direction");

      canvas.node.selectAll(".y-axis g text").attr("fill", "#666");
      canvas.node.selectAll(".y-axis g line").attr("stroke", "#666");

      const svg = select("#my_dataviz-wave");

      // Handmade legend
      svg
        .append("circle")
        .attr("cx", 10)
        .attr("cy", 10)
        .attr("r", 6)
        .style("fill", "red");
      svg
        .append("text")
        .attr("x", 20)
        .attr("y", 10)
        .text("Wave Direction")
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle");
      svg
        .append("circle")
        .attr("cx", 150)
        .attr("cy", 10)
        .attr("r", 6)
        .style("fill", "darkBlue");

      svg
        .append("text")
        .attr("x", 170)
        .attr("y", 10)
        .text("Sig. Wave Height")
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle");
      svg
        .append("circle")
        .attr("cx", 300)
        .attr("cy", 10)
        .attr("r", 6)
        .style("fill", "lightBlue");

      svg
        .append("text")
        .attr("x", 320)
        .attr("y", 10)
        .text("Max Wave Height")
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle");
    }
  };

  return (
    <Container>
      <div className="App">
        <div className="header" style={{ minHeight: "70px" }}>
          <h3 className="text-muted">Wave Dashboard</h3>
          <svg id="my_dataviz-wave" height="30" width="450"></svg>
        </div>
        <div
          style={{
            textAlign: "center",
            borderBottom: "1px solid #e5e5e5",
            padding: "0",
            minHeight: "300px",
          }}
          className={`jumbotron ${wrapperDiv.replace(".", "")}`}
          id={targetId}
        />
      </div>
    </Container>
  );
}

export default WaveDashboard;
