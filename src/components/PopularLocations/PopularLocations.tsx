import { Dispatch, FC, SetStateAction } from "react";
import FavLocations from "../FavLocations";
import { City, District, Municipality, MunicipalityCity } from "@/types";

export interface PopularLocationsProps {
  favoriteCityShadow?: City;
  popularCities: any[];
  popularMunicipalities: any[];
  setMunicipalityShadow: Dispatch<SetStateAction<Municipality | undefined>>;
  setFavoriteCityShadow: Dispatch<SetStateAction<City | undefined>>;
  setCityDistrictsList: Dispatch<SetStateAction<District[]>>;
  setMunicipalityCitiesList: Dispatch<SetStateAction<MunicipalityCity[]>>;
}

export const PopularLocations: FC<PopularLocationsProps> = ({
  favoriteCityShadow,
  popularCities,
  popularMunicipalities,
  setMunicipalityShadow,
  setFavoriteCityShadow,
  setCityDistrictsList,
  setMunicipalityCitiesList,
}) => (
  <div className="grid grid-cols-2 gap-2 mx-6">
    <FavLocations
      list={popularCities}
      innserSectionField="districts"
      titleField="cityTitle"
      changeHandler={(item) => {
        setFavoriteCityShadow(item as City);
      }}
      clickHandler={(item) => {
        setFavoriteCityShadow(item as City);
        setCityDistrictsList(item.districts as District[]);
      }}
      isChecked={(item) => item.cityId === favoriteCityShadow?.cityId}
    />
    <FavLocations
      list={popularMunicipalities}
      innserSectionField="cities"
      titleField="municipalityTitle"
      changeHandler={(item) => {
        setMunicipalityShadow(item as Municipality);
      }}
      clickHandler={(item) => {
        setMunicipalityShadow(item as Municipality);
        setMunicipalityCitiesList(item.cities as MunicipalityCity[]);
      }}
    />
  </div>
);
