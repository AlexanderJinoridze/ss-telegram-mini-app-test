export type valueOf<T> = T[keyof T];

export type PropertyTypeStatusMap = {
  [key in number]: { id: number; label: string }[];
};

export type Street = {
  streetId: number;
  streetTitle: string;
  latitude: string | null;
  longitude: string | null;
};

export type SubDistrict = {
  subDistrictId: number;
  subDistrictTitle: string;
  subDistrictTitleSeo: string;
  latitude: string | null;
  longitude: string | null;
  streets: Street[];
};

export type District = {
  districtId: number;
  districtTitle: string;
  latitude: string | null;
  longitude: string | null;
  subDistricts: SubDistrict[];
};

export type City = {
  cityId: number;
  cityTitle: string;
  latitude: null;
  longitude: null;
  districts: District[];
};

export type MunicipalityCity = {
  id: number;
  title: string;
  latitude: null;
  longitude: null;
};

export type Municipality = {
  municipalityId: number;
  municipalityTitle: string;
  latitude: null;
  longitude: null;
  cities: MunicipalityCity[];
};
