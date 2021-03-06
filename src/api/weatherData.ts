/* eslint-disable @typescript-eslint/camelcase */
import { csv } from "d3-fetch";
import weatherDataJson from "./data.json";

const getWeatherDataJson = (): {
  [dateTime: string]: {
    sea_surface_wave_significant_height?: number;
    surface_sea_water_speed?: number;
    sea_surface_wave_maximum_height?: number;
  };
} => {
  return weatherDataJson;
};

const castString2Number = (data: string | undefined) => {
  if (data) {
    return Number(data);
  }
  return undefined;
};

const castString2Date = (data: string | undefined) => {
  if (data) {
    return new Date(data);
  }
  return undefined;
};

const getWeatherDataCSV = () => {
  return csv("data.csv", function (d) {
    return {
      datetime: castString2Date(d.datetime),
      sea_surface_wave_significant_height: castString2Number(
        d.sea_surface_wave_significant_height
      ),
      air_temperature_at_2m_above_ground_level: castString2Number(
        d.air_temperature_at_2m_above_ground_level
      ),
      wind_from_direction_at_10m_above_ground_level: castString2Number(
        d.wind_from_direction_at_10m_above_ground_level
      ),
      wind_speed_at_10m_above_ground_level: castString2Number(
        d.wind_speed_at_10m_above_ground_level
      ),
    };
  }).then(function (data) {
    return data;
  });
};

export { getWeatherDataJson, getWeatherDataCSV };
