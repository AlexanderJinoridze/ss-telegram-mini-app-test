import {
  Badge,
  Button,
  Divider,
  IconButton,
  Input,
  Subheadline,
  Text,
} from "@telegram-apps/telegram-ui";
import { FC, Fragment, useEffect, useState } from "react";
import ModalSection from "../ModalSection";
import locationChain from "../../app/_assets/locationChain.json";
import union from "lodash.union";
import difference from "lodash.difference";
import find from "lodash.find";
import filter from "lodash.filter";
import AlphabeticalList from "../AlphabeticalList";
import FavLocations from "../FavLocations";
import ModalCell from "../ModalCell";

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

export const LocationModal: FC = () => {
  const [selectedMunicipality, setSelectedMunicipality] =
    useState<Municipality>();
  const [selectedMunicipalityCities, setSelectedMunicipalityCities] = useState<
    MunicipalityCity[]
  >([]);
  const [selectedFavCity, setSelectedFavCity] = useState<City>();
  const [selectedSubDistricts, setSelectedSubDistricts] = useState<
    SubDistrict[]
  >([]);
  const [selectedStreets, setSelectedStreets] = useState<Street[]>([]);

  const [showStreets, setShowStreets] = useState<boolean>(false);

  const [cityDistricts, setCityDistricts] = useState<District[]>([]);
  const [municipalityCities, setMunicipalityCities] = useState<
    MunicipalityCity[]
  >([]);
  const [streets, setStreets] = useState<Street[]>([]);

  useEffect(() => {
    // console.log("selectedFavCity", selectedFavCity);
    // console.log("selectedMunicipality", selectedMunicipality);
    // console.log("selectedMunicipalityCities", selectedMunicipalityCities);
    // console.log("selectedSubDistricts", selectedSubDistricts);
    // console.log("selectedStreets", selectedStreets);
  }, [
    selectedFavCity,
    selectedMunicipality,
    selectedMunicipalityCities,
    selectedSubDistricts,
    selectedStreets,
  ]);

  return (
    <div className="flex flex-col min-h-0">
      {/* {municipalityCities || cityDistricts ? (
        <button
          onClick={() => {
            setSelectedFavCity(undefined);
            setSelectedMunicipality(undefined);
            setMunicipalityCities(undefined);
            setCityDistricts(undefined);
            setSelectedSubDistricts([]);
            setStreets([]);
            setSelectedStreets([]);
            setShowStreets(false);
          }}
        >
          BACK
        </button>
      ) : null} */}
      <div className="modal-input">
        <Input
          before={<span className="material-symbols-outlined">search</span>}
          placeholder="ჩაწერე რაიონი, ქალაქი, უბანი ან ქუჩა"
        />
      </div>
      <div className="flex [&:empty]:hidden gap-2 flex-shrink-0 items-center h-9 box-content px-6 pb-4">
        {(selectedSubDistricts &&
          selectedFavCity &&
          selectedFavCity.districts.length) ||
        selectedMunicipality ? (
          <IconButton
            size="s"
            mode="bezeled"
            onClick={() => {
              if (selectedMunicipality) {
                setMunicipalityCities([]);
                setSelectedMunicipality(undefined);
                setSelectedMunicipalityCities([]);
              } else if (showStreets) {
                setSelectedSubDistricts([]);
                setShowStreets(false);
                setSelectedStreets([]);
                setStreets([]);
              } else {
                setSelectedFavCity(undefined);
                setSelectedSubDistricts([]);
                setCityDistricts([]);
                setShowStreets(false);
                setStreets([]);
              }
            }}
          >
            <span className="material-symbols-outlined">
              keyboard_arrow_left
            </span>
          </IconButton>
        ) : null}

        {showStreets ? (
          <>
            {selectedStreets.length ? (
              <Button
                size="s"
                onClick={() => {
                  setSelectedStreets([]);
                }}
                after={<span className="material-symbols-outlined">close</span>}
              >
                {selectedStreets.map((item) => item.streetTitle).join(", ")}
              </Button>
            ) : (
              <Text weight="1" className="truncate">
                {selectedSubDistricts
                  .map((item) => item.subDistrictTitle)
                  .join(", ")}
              </Text>
            )}
          </>
        ) : selectedSubDistricts.length ? (
          <Button
            size="s"
            onClick={() => {
              setSelectedSubDistricts([]);
              setStreets([]);
            }}
            after={<span className="material-symbols-outlined">close</span>}
          >
            {selectedSubDistricts
              .map((item) => item.subDistrictTitle)
              .join(", ")}
          </Button>
        ) : selectedFavCity && selectedFavCity.districts.length ? (
          <Text weight="1" className="truncate">
            {selectedFavCity.cityTitle}
          </Text>
        ) : null}

        {streets.length && !showStreets ? (
          <Button
            size="s"
            mode="bezeled"
            className="shrink-0 pr-[3px] ml-auto"
            onClick={() => {
              setShowStreets(true);
            }}
            before={
              <span className="material-symbols-outlined">location_on</span>
            }
          >
            ქუჩები
            <Badge type="number" className="bg-amber-400 text-zinc-950">
              {streets.length}
            </Badge>
          </Button>
        ) : null}

        {selectedMunicipalityCities.length ? (
          <Button
            size="s"
            onClick={() => {
              setSelectedMunicipalityCities([]);
            }}
            after={<span className="material-symbols-outlined">close</span>}
          >
            {selectedMunicipalityCities.map((item) => item.title).join(", ")}
          </Button>
        ) : selectedMunicipality ? (
          <Text weight="1" className="truncate">
            {selectedMunicipality.municipalityTitle}
          </Text>
        ) : null}
      </div>
      <Divider />
      <div className="flex flex-col justify-between items-center overflow-auto">
        {showStreets ? (
          <ModalSection>
            <AlphabeticalList
              list={streets}
              idField="streetId"
              titleField="streetTitle"
              isChecked={(item) =>
                !!find(
                  selectedStreets,
                  (a: any) => a.streetId === item.streetId
                )
              }
              changeHandler={(item, value, isChecked) => {
                setSelectedStreets(
                  isChecked
                    ? [...selectedStreets, item]
                    : filter(
                        selectedStreets,
                        (item) => item?.streetId !== Number(value)
                      )
                );
              }}
            />
          </ModalSection>
        ) : cityDistricts.length ? (
          <ModalSection>
            {cityDistricts.map((item) => (
              <Fragment key={item.districtId}>
                <ModalCell
                  value={item.subDistricts.map((item) =>
                    String(item.subDistrictId)
                  )}
                  isChecked={item.subDistricts.every(
                    (item) =>
                      !!find(
                        selectedSubDistricts,
                        (a: any) => a.subDistrictId === item.subDistrictId
                      )
                  )}
                  changeHandler={(value, checked) => {
                    setSelectedSubDistricts(
                      checked
                        ? union(selectedSubDistricts, item.subDistricts)
                        : selectedSubDistricts.filter(
                            (item) =>
                              !value
                                .split(",")
                                .includes(String(item?.subDistrictId))
                          )
                    );
                    setStreets(
                      checked
                        ? union(
                            streets,
                            item.subDistricts.map((item) => item.streets).flat()
                          )
                        : difference(
                            streets,
                            item.subDistricts.map((item) => item.streets).flat()
                          )
                    );
                  }}
                >
                  <Subheadline weight="1">{item.districtTitle}</Subheadline>
                </ModalCell>
                {item.subDistricts.map((item) => (
                  <ModalCell
                    key={item.subDistrictId}
                    value={item.subDistrictId}
                    isChecked={
                      !!find(
                        selectedSubDistricts,
                        (a: any) => a.subDistrictId === item.subDistrictId
                      )
                    }
                    changeHandler={(value, checked) => {
                      setSelectedSubDistricts(
                        checked
                          ? [...selectedSubDistricts, item]
                          : filter(
                              selectedSubDistricts,
                              (item) => item?.subDistrictId !== Number(value)
                            )
                      );
                      setStreets(
                        checked
                          ? [...streets, ...item.streets]
                          : difference(streets, item.streets)
                      );
                    }}
                  >
                    {item.subDistrictTitle}
                  </ModalCell>
                ))}
              </Fragment>
            ))}
          </ModalSection>
        ) : municipalityCities.length ? (
          <ModalSection>
            <AlphabeticalList
              list={municipalityCities}
              isChecked={(item) =>
                !!find(selectedMunicipalityCities, (a: any) => a.id === item.id)
              }
              changeHandler={(item, value, isChecked) => {
                setSelectedMunicipalityCities(
                  isChecked
                    ? [...selectedMunicipalityCities, item]
                    : filter(
                        selectedMunicipalityCities,
                        (item) => item?.id !== Number(value)
                      )
                );
              }}
            />
          </ModalSection>
        ) : (
          <>
            <ModalSection title="პოპულარული ქალაქები">
              <div className="grid grid-cols-2 gap-2 mx-6">
                <FavLocations
                  list={locationChain.visibleCities}
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
                  list={locationChain.visibleMunicipalitetyChain}
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
            </ModalSection>
            <ModalSection title="მუნიციპალიტეტები">
              <AlphabeticalList
                list={locationChain.municipalityChain}
                idField="municipalityId"
                titleField="municipalityTitle"
                clickHandler={(item) => {
                  setSelectedMunicipality(item as Municipality);
                  setMunicipalityCities(item.cities as MunicipalityCity[]);
                }}
              />
            </ModalSection>
          </>
        )}
      </div>
    </div>
  );
};
