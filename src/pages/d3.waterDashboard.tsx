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
import { axisBottom, axisLeft } from "d3-axis";
import { MergedWeatherDataType, removeUndefined } from "../api/weatherData";
import { CanvasType, defaultCanvas } from "../utils/canvas";
import { ElementResize } from "../components/elementResize";

const wrapperDiv = ".graph-water";

function WaterDashboard({
  mergedWeatherData,
}: {
  mergedWeatherData: MergedWeatherDataType[] | undefined;
}) {
  const targetId = "graph-canvas-water";
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
        // dataset,
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
          if (d.datetime && d.surface_sea_water_speed) {
            return d.datetime;
          }
          return undefined;
        })
        .filter(removeUndefined);
      const range = extent(DateArr) as [Date, Date];
      const x = scaleTime().range([0, canvas.x]).domain(range);

      /** Temp on y axis */
      const windSpeed = data
        .map((d) => d.surface_sea_water_speed)
        .filter(removeUndefined);
      const windSpeedRange = extent(windSpeed) as [number, number];
      const y = scaleLinear()
        .range([canvas?.y ?? 0, 0])
        .domain(windSpeedRange);

      const _line = line<[Date, number]>()
        .curve(curveNatural)
        .x(function (d) {
          return x(d[0]);
        })
        .y(function (d) {
          const yAxis = y(d[1]);
          return y(d[1]);
        });

      const lineGraph = canvas.node.append("g");

      const waterSpeedData = mergedWeatherData
        .filter((a) => a.surface_sea_water_speed)
        .map(
          (a) => [a.datetime!, a.surface_sea_water_speed!] as [Date, number]
        );

      canvas.node
        .append("g")
        .selectAll(".location")
        .data([waterSpeedData])
        .enter()
        .append("g")
        .attr("class", "location")
        .append("path")
        .attr("class", "line")
        .attr("d", function (d) {
          const t = _line(d);
          console.log(t);
          return t;
        })
        .style("stroke", function (d) {
          return "darkBlue";
        })
        .attr("fill", "none");

      canvas?.node
        .append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + canvas.y + ")")
        .call(axisBottom(x));

      canvas.node
        .append("g")
        .attr("class", "axis y-axis")
        .call(axisLeft(y))
        .append("text")
        .attr(
          "transform",
          "rotate(-90) translate(" +
            -(canvas.y / 2) +
            ", " +
            -defaultCanvas.left +
            ")"
        )
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .style("font-weight", "normal")
        .style("font-size", "12px")
        .attr("y", 6)
        .attr("dy", ".35em")
        .attr("fill", "#666")
        .text("Water Speed");
      canvas.node.selectAll(".y-axis g text").attr("fill", "#666");
      canvas.node.selectAll(".y-axis g line").attr("stroke", "#666");

      const svg = select("#my_dataviz-water");

      // Handmade legend
      svg
        .append("circle")
        .attr("cx", 10)
        .attr("cy", 10)
        .attr("r", 6)
        .style("fill", "darkBlue");
      svg
        .append("text")
        .attr("x", 20)
        .attr("y", 10)
        .text("Water Speed")
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle");
    }
  };

  return (
    <Container>
      <div className="App">
        <div className="header" style={{ minHeight: "70px" }}>
          <h3 className="text-muted">Water Dashboard</h3>
          <svg id="my_dataviz-water" height="30" width={canvas?.x ?? 405}></svg>
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

export default WaterDashboard;
