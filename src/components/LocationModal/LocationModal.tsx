import {
  Badge,
  Button,
  Cell,
  Checkbox,
  IconButton,
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
    <>
      <div className="mx-6">
        <input className="w-full" />
      </div>
      <div className="flex gap-2 items-center h-9 px-6 my-4">
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
      <div className="flex flex-col justify-between items-center">
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
              onChangeHandler={(item, isChecked, value) => {
                if (isChecked) {
                  setSelectedStreets([...selectedStreets, item]);
                } else {
                  setSelectedStreets(
                    filter(
                      selectedStreets,
                      (item) => item?.streetId !== Number(value)
                    )
                  );
                }
              }}
            />
          </ModalSection>
        ) : cityDistricts.length ? (
          <ModalSection>
            {cityDistricts.map((item) => {
              return (
                <Fragment key={item.districtId}>
                  <Cell
                    className={`px-6 transition-colors hover:bg-transparent ${
                      item.subDistricts.every((item) =>
                        selectedSubDistricts
                          .map((item) => item.subDistrictId)
                          .includes(item.subDistrictId)
                      )
                        ? "!bg-[--tg-theme-secondary-bg-color]"
                        : "bg-transparent"
                    }`}
                    Component="label"
                    after={
                      <Checkbox
                        name="district"
                        checked={item.subDistricts.every((item) =>
                          selectedSubDistricts
                            .map((item) => item.subDistrictId)
                            .includes(item.subDistrictId)
                        )}
                        value={item.subDistricts.map((item) =>
                          String(item.subDistrictId)
                        )}
                        onChange={(event) => {
                          if (event.target.checked) {
                            setSelectedSubDistricts(
                              union(selectedSubDistricts, item.subDistricts)
                            );

                            setStreets(
                              union(
                                streets,
                                item.subDistricts
                                  .map((item) => item.streets)
                                  .flat()
                              )
                            );
                          } else {
                            setStreets(
                              difference(
                                streets,
                                item.subDistricts
                                  .map((item) => item.streets)
                                  .flat()
                              )
                            );
                            setSelectedSubDistricts(
                              selectedSubDistricts.filter(
                                (item) =>
                                  !event?.target?.value
                                    .split(",")
                                    .includes(String(item?.subDistrictId))
                              )
                            );
                          }
                        }}
                      />
                    }
                  >
                    <Subheadline weight="1">{item.districtTitle}</Subheadline>
                  </Cell>
                  <div>
                    {item.subDistricts.map((item) => {
                      return (
                        <Cell
                          key={item.subDistrictId}
                          className={`px-6 transition-colors hover:bg-transparent ${
                            selectedSubDistricts.some(
                              (a) => a.subDistrictId === item.subDistrictId
                            )
                              ? "!bg-[--tg-theme-secondary-bg-color]"
                              : "bg-transparent"
                          }`}
                          Component="label"
                          after={
                            <Checkbox
                              name="subDistrict"
                              value={item.subDistrictId}
                              checked={
                                !!find(
                                  selectedSubDistricts,
                                  (a: any) =>
                                    a.subDistrictId === item.subDistrictId
                                )
                              }
                              onChange={(event) => {
                                if (event.target.checked) {
                                  setSelectedSubDistricts([
                                    ...selectedSubDistricts,
                                    item,
                                  ]);
                                  setStreets([...streets, ...item.streets]);
                                } else {
                                  setStreets(difference(streets, item.streets));
                                  setSelectedSubDistricts(
                                    filter(
                                      selectedSubDistricts,
                                      (item) =>
                                        item?.subDistrictId !==
                                        Number(event?.target?.value)
                                    )
                                  );
                                }
                              }}
                            />
                          }
                        >
                          {item.subDistrictTitle}
                        </Cell>
                      );
                    })}
                  </div>
                </Fragment>
              );
            })}
          </ModalSection>
        ) : municipalityCities.length ? (
          <ModalSection>
            <AlphabeticalList
              list={municipalityCities}
              isChecked={(item) =>
                !!find(selectedMunicipalityCities, (a: any) => a.id === item.id)
              }
              onChangeHandler={(item, isChecked, value) => {
                if (isChecked) {
                  setSelectedMunicipalityCities([
                    ...selectedMunicipalityCities,
                    item,
                  ]);
                } else {
                  setSelectedMunicipalityCities(
                    filter(
                      selectedMunicipalityCities,
                      (item) => item?.id !== Number(value)
                    )
                  );
                }
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
                  onChangeHandler={(item) => {
                    setSelectedFavCity(item as City);
                  }}
                  onClickHandler={(item) => {
                    setSelectedFavCity(item as City);
                    setCityDistricts(item.districts as District[]);
                  }}
                />
                <FavLocations
                  list={locationChain.visibleMunicipalitetyChain}
                  innserSectionField="cities"
                  titleField="municipalityTitle"
                  onChangeHandler={(item) => {
                    setSelectedMunicipality(item as Municipality);
                  }}
                  onClickHandler={(item) => {
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
                onClickHandler={(item) => {
                  setSelectedMunicipality(item as Municipality);
                  setMunicipalityCities(item.cities as MunicipalityCity[]);
                }}
              />
            </ModalSection>
          </>
        )}
      </div>
    </>
  );
};
