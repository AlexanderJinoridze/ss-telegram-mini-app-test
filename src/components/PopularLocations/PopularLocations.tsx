import { Dispatch, FC, SetStateAction } from "react";
import FavLocations from "../FavLocations";
import { City, District, Municipality, MunicipalityCity } from "@/types";


export interface PopularLocationsProps {
  popularCities: any[];
  popularMunicipalities: any[];
  setSelectedMunicipality: Dispatch<SetStateAction<Municipality | undefined>>;
  setSelectedFavCity: Dispatch<SetStateAction<City | undefined>>;
  setCityDistricts: Dispatch<SetStateAction<District[]>>;
  setMunicipalityCities: Dispatch<SetStateAction<MunicipalityCity[]>>;
}

export const PopularLocations: FC<PopularLocationsProps> = ({
  popularCities,
  popularMunicipalities,
  setSelectedMunicipality,
  setSelectedFavCity,
  setCityDistricts,
  setMunicipalityCities,
}) => {
  return (
    <div className="grid grid-cols-2 gap-2 mx-6">
      <FavLocations
        list={popularCities}
        innserSectionField="districts"
        titleField="cityTitle"
        changeHandler={(item) => {
          setSelectedFavCity(item as City);
        }}
        clickHandler={(item) => {
          setSelectedFavCity(item as City);
          setCityDistricts(item.districts as District[]);
        }}
      />
      <FavLocations
        list={popularMunicipalities}
        innserSectionField="cities"
        titleField="municipalityTitle"
        changeHandler={(item) => {
          setSelectedMunicipality(item as Municipality);
        }}
        clickHandler={(item) => {
          setSelectedMunicipality(item as Municipality);
          setMunicipalityCities(item.cities as MunicipalityCity[]);
        }}
      />
    </div>
  );
};
