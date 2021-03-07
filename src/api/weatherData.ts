/* eslint-disable @typescript-eslint/camelcase */
import { DSVParsedArray } from "d3";
import { csv } from "d3-fetch";
import weatherDataJson from "./data.json";

type WeatherDataJSONType = {
  datetime?: Date | undefined;
  sea_surface_wave_from_direction_at_variance_spectral_density_maximum?:
    | number
    | undefined;
  surface_sea_water_speed?: number | undefined;
  sea_surface_wave_maximum_height?: number | undefined;
};
/** Clean Weather Data Json For Easy Merging with CSV data */
const getWeatherDataJson = (): WeatherDataJSONType[] => {
  const objectEntries = (Object.entries(weatherDataJson) as unknown) as [
    string,
    {
      sea_surface_wave_from_direction_at_variance_spectral_density_maximum:
        | number
        | undefined;
      surface_sea_water_speed: number | undefined;
      sea_surface_wave_maximum_height: number | undefined;
    }
  ][];
  const r = objectEntries.map(([k, v]) => {
    const {
      sea_surface_wave_from_direction_at_variance_spectral_density_maximum,
      surface_sea_water_speed,
      sea_surface_wave_maximum_height,
    } = v;

    const r: WeatherDataCSVType = {
      datetime: new Date(k),
      sea_surface_wave_from_direction_at_variance_spectral_density_maximum,
      sea_surface_wave_maximum_height,
      surface_sea_water_speed,
    };
    return r;
  });
  return r;
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

type WeatherDataCSVType = {
  datetime?: Date | undefined;
  air_temperature_at_2m_above_ground_level?: number | undefined;
  sea_surface_wave_significant_height?: number | undefined;
  wind_from_direction_at_10m_above_ground_level?: number | undefined;
  wind_speed_at_10m_above_ground_level?: number | undefined;
};

const getWeatherDataCSV = () => {
  return csv("data.csv", function (d) {
    const r: WeatherDataCSVType = {
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
    return r;
  }).then(function (data) {
    return data as WeatherDataCSVType[];
  });
};

export type MergedWeatherDataType = WeatherDataCSVType & WeatherDataJSONType;

const getMergedWeatherData = async () => {
  const weatherJson = getWeatherDataJson();
  const weatherCsv = await getWeatherDataCSV();
  const jsonKeys = weatherJson.map((j) => j.datetime);
  const mergedCsv = weatherCsv
    .map((c) => {
      if (c.datetime) {
        const t = jsonKeys.indexOf(c.datetime);
        if (t >= 0) {
          return { ...weatherJson[t], ...weatherCsv[t] };
        }
        return c;
      }
    })
    .filter(removeUndefined);
  const r = [...weatherJson, ...mergedCsv] as MergedWeatherDataType[];
  return r;
};

export const removeUndefined = <S>(value: S | undefined): value is S =>
  value !== undefined;

export { getWeatherDataJson, getWeatherDataCSV, getMergedWeatherData };
