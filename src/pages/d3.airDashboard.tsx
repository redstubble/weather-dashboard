import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { select } from "d3-selection";
import { timeFormat } from "d3-time-format";
import {
  timeSecond,
  timeMinute,
  timeHour,
  timeDay,
  timeMonth,
  timeWeek,
  timeYear,
} from "d3-time";
import { extent } from "d3-array";
import { scaleTime, scaleLinear } from "d3-scale";
import { line, curveNatural } from "d3-shape";
import { axisBottom, axisLeft } from "d3-axis";
import { MergedWeatherDataType, removeUndefined } from "../api/weatherData";
import { CanvasType, defaultCanvas } from "../utils/canvas";
import { ElementResize } from "../components/elementResize";

const graphDiv = ".graph-canvas";

function TempDashboard({
  mergedWeatherData,
}: {
  mergedWeatherData: MergedWeatherDataType[] | undefined;
}) {
  const [canvas, setCanvas] = useState<CanvasType>();
  const target = { id: "graph-canvas-weather" };
  const [width, height] = ElementResize(target);

  const clearGraph = () => {
    select(graphDiv).selectAll("*").remove();
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
    const containerDiv = window.document.getElementById("graph-canvas-weather");
    if (containerDiv && mergedWeatherData) {
      const width = containerDiv?.clientWidth ?? 0;
      const height = containerDiv?.clientHeight ?? 0;
      const svg = select(graphDiv)
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
      // const dataset: {
      //   key: string;
      //   values: any;
      //   value: undefined;
      // }[] = nest<MergedWeatherDataType>()
      //   .key(function () {
      //     return "Temperature";
      //   })
      //   .rollup((d: MergedWeatherDataType[]) => {
      //     console.log(d);
      //     debugger;
      //     return d[0] as MergedWeatherDataType;
      //   })
      //   .entries(mergedWeatherData);
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
          if (d.datetime && d.air_temperature_at_2m_above_ground_level) {
            return d.datetime;
          }
          return undefined;
        })
        .filter(removeUndefined);
      const range = extent(DateArr) as [Date, Date];
      const x = scaleTime().range([0, canvas.x]).domain(range);

      /** Temp on y axis */
      const tempArr = data
        .map((d) => d.air_temperature_at_2m_above_ground_level ?? undefined)
        .filter(removeUndefined);
      const tempRange = extent(tempArr) as [number, number];
      const [lowestTemp, highestTemp] = tempRange;
      const y = scaleLinear()
        .range([canvas?.y ?? 0, 0])
        .domain([lowestTemp, highestTemp]);

      const _line = line<MergedWeatherDataType>()
        .curve(curveNatural)
        .x(function (d: MergedWeatherDataType) {
          return x(d.datetime ?? 0);
        })
        .y(function (d) {
          const yAxis = y(d.air_temperature_at_2m_above_ground_level ?? 0);
          return y(d.air_temperature_at_2m_above_ground_level ?? 0);
        });

      const lineGraph = canvas.node.append("g");

      canvas.node
        .append("g")
        .selectAll(".location")
        .data([mergedWeatherData[0]])
        .enter()
        .append("g")
        .attr("class", "location")
        .append("path")
        .attr("class", "line")
        .attr("d", function (d) {
          const t = _line(
            mergedWeatherData.filter(
              (a) => a.air_temperature_at_2m_above_ground_level
            )
          );
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
        .call(
          axisLeft(y).ticks(
            Math.min(Math.round(Math.floor(canvas.y / 35) + 1), highestTemp),
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
        .text("Temp");
      canvas.node.selectAll(".y-axis g text").attr("fill", "#666");
      canvas.node.selectAll(".y-axis g line").attr("stroke", "#666");

      const svg = select("#my_dataviz-air");

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
        .text("Air Temp")
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle");
    }
  };

  return (
    <Container>
      <div className="App">
        <div className="header" style={{ minHeight: "70px" }}>
          <h3 className="text-muted">Air Dashboard</h3>
          <svg id="my_dataviz-air" height="30" width={canvas?.x ?? 405}></svg>
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
      </div>
    </Container>
  );
}

export default TempDashboard;
