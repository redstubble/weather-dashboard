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
import { useDetectElementResize } from "use-element-resize";

const wrapperDiv = ".graph-wave-heihgt";

function WaveHeightDashboard({
  mergedWeatherData,
}: {
  mergedWeatherData: MergedWeatherDataType[] | undefined;
}) {
  const targetId = "graph-canvas-wave-height";
  const [canvas, setCanvas] = useState<CanvasType>();
  const target = { id: targetId };
  const [width, height] = useDetectElementResize(target);

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
    const containerDiv = document.getElementById(targetId);
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
    const _timeParse = timeParse("%Y-%m-%dT%H:%M");
    const formatTime = timeFormat("%Y-%m-%dT%H:%M");

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
      debugger;
      const y = scaleLinear()
        .range([canvas?.y ?? 0, 0])
        .domain([lowestWave, highestWave]);

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

      const waveMaxHeight = mergedWeatherData
        .filter((a) => a.sea_surface_wave_maximum_height)
        .map(
          (a) =>
            [a.datetime!, a.sea_surface_wave_maximum_height!] as [Date, number]
        );

      const waveAvgHeight = mergedWeatherData
        .filter((a) => a.sea_surface_wave_significant_height)
        .map(
          (a) =>
            [a.datetime!, a.sea_surface_wave_significant_height!] as [
              Date,
              number
            ]
        );

      canvas.node
        .append("g")
        .selectAll(".location")
        .data([waveMaxHeight, waveAvgHeight])
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
          return "#000000";
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
        .attr("class", "axis y-axis")
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
      canvas.node.selectAll(".y-axis g text").attr("fill", "#666");
      canvas.node.selectAll(".y-axis g line").attr("stroke", "#666");
    }
  };

  return (
    <Container>
      <div className="App">
        <div className="header">
          <h3 className="text-muted">Wave Height</h3>
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

export { WaveHeightDashboard };
