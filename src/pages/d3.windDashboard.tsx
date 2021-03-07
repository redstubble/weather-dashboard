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
import { ElementResize } from "../components/elementResize";

const wrapperDiv = ".graph-wind";

function WindDashboard({
  mergedWeatherData,
}: {
  mergedWeatherData: MergedWeatherDataType[] | undefined;
}) {
  const targetId = "graph-canvas-wind";
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
        .map((d) => {
          if (
            d.datetime &&
            (d.wind_from_direction_at_10m_above_ground_level ||
              d.wind_speed_at_10m_above_ground_level)
          ) {
            return d.datetime;
          }
          return undefined;
        })
        .filter(removeUndefined);
      const range = extent(DateArr) as [Date, Date];
      const x = scaleTime()
        .range([0, canvas.x - 30])
        .domain(range);

      /** Temp on y axis */
      const windSpeed = data
        .map((d) => d.wind_speed_at_10m_above_ground_level)
        .filter(removeUndefined);
      const windSpeedRange = extent(windSpeed) as [number, number];
      const [lowestWindSpd, highestWindSpd] = windSpeedRange;
      const y = scaleLinear()
        .range([canvas?.y ?? 0, 0])
        .domain([lowestWindSpd, highestWindSpd]);

      const y1 = scaleLinear()
        .range([canvas?.y ?? 0, 0])
        .domain([0, 360]);

      const _area = area<[Date, number]>()
        .curve(curveStepAfter)
        .x(function (d) {
          return x(d[0]);
        })
        .y0(canvas.y)
        .y1(function (d) {
          return y(d[1]);
        });

      const _line = line<[Date, number]>()
        .curve(curveStepAfter)
        .x(function (d) {
          return x(d[0]);
        })
        .y(function (d) {
          const yAxis = y(d[1]);
          return y(d[1]);
        });

      const lineGraph = canvas.node.append("g");

      const windSpeedData = mergedWeatherData
        .filter((a) => a.wind_speed_at_10m_above_ground_level)
        .map(
          (a) =>
            [a.datetime!, a.wind_speed_at_10m_above_ground_level!] as [
              Date,
              number
            ]
        );

      canvas.node
        .append("g")
        .selectAll(".location")
        .data([windSpeedData])
        .enter()
        .append("g")
        .attr("class", "location")
        .append("path")
        .attr("class", "line")
        .attr("d", function (d) {
          const t = _area(d);
          console.log(t);
          return t;
        })
        .style("stroke", function (d) {
          return "darkBlue";
        })
        .attr("fill", "darkBlue");

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

      canvas?.node
        .append("g")
        .selectAll("dot")
        .data(
          mergedWeatherData.filter(
            (d) => d.wind_from_direction_at_10m_above_ground_level
          )
        )
        .enter()
        .append("circle")
        .attr("cx", function (d: MergedWeatherDataType) {
          return x(d.datetime!);
        })
        .attr("cy", function (d: MergedWeatherDataType) {
          return y1(d.wind_from_direction_at_10m_above_ground_level!);
        })
        .attr("r", 1.5)
        .style("fill", "red");

      canvas.node
        .append("g")
        .attr("transform", `translate(${canvas.x - 30}, 0)`)
        .attr("class", "axisRed")
        .call(axisRight(y1))
        .append("text")
        .attr(
          "transform",
          `rotate(-90) translate(${-(canvas.y / 2)}, ${30}
            )`
        )
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .style("font-weight", "normal")
        .style("font-size", "12px")
        .attr("y", 6)
        .attr("dy", ".35em")
        .attr("fill", "red")
        .text("Direction");

      canvas.node
        .append("g")
        .attr("class", "axis y-axis")
        .attr("class", "axisBlue")

        .call(
          axisLeft(y).ticks(
            Math.min(Math.round(Math.floor(canvas.y / 35) + 1), highestWindSpd),
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
        .text("Wind Speed");
      canvas.node.selectAll(".y-axis g text").attr("fill", "#666");
      canvas.node.selectAll(".y-axis g line").attr("stroke", "#666");

      const svg = select("#my_dataviz-wind");

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
        .text("Wind Direction")
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
        .text("Wind Speed")
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle");
    }
  };

  return (
    <Container>
      <div className="App">
        <div className="header" style={{ minHeight: "70px" }}>
          <h3 className="text-muted">Wind Dashboard</h3>
          <svg id="my_dataviz-wind" height="30" width={canvas?.x ?? 405}></svg>
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

export default WindDashboard;
