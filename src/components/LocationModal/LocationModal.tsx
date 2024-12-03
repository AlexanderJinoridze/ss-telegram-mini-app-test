import {
  Badge,
  Button,
  Cell,
  Checkbox,
  Chip,
  IconButton,
  Radio,
  Subheadline,
  Text,
} from "@telegram-apps/telegram-ui";
import { FC, Fragment, useEffect, useState } from "react";
import ModalSection from "../ModalSection";
import locationChain from "../../app/_assets/locationChain.json";
import union from "lodash.union";
import difference from "lodash.difference";
import AlphabeticalList from "../AlphabeticalList";

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
    console.log("selectedFavCity", selectedFavCity);
    console.log("selectedMunicipality", selectedMunicipality);
    console.log("selectedMunicipalityCities", selectedMunicipalityCities);
    console.log("selectedSubDistricts", selectedSubDistricts);
    console.log("selectedStreets", selectedStreets);
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
              <Text weight="1">
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
          <Text weight="1">{selectedFavCity.cityTitle}</Text>
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
          <Text weight="1">{selectedMunicipality.municipalityTitle}</Text>
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
                selectedStreets.some((a) => a.streetTitle === item.streetTitle)
              }
              onChangeHandler={(item, isChecked, value) => {
                if (isChecked) {
                  setSelectedStreets([...selectedStreets, item]);
                } else {
                  setSelectedStreets(
                    selectedStreets.filter((item) => {
                      return item?.streetId !== Number(value);
                    })
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
                    Component="label"
                    after={
                      <Checkbox
                        name="district"
                        checked={item.subDistricts.every((item) => {
                          return selectedSubDistricts
                            .map((item) => item.subDistrictId)
                            .includes(item.subDistrictId);
                        })}
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
                    multiline
                  >
                    <Subheadline weight="1">{item.districtTitle}</Subheadline>
                  </Cell>
                  <div>
                    {item.subDistricts.map((item) => {
                      return (
                        <Cell
                          key={item.subDistrictId}
                          Component="label"
                          after={
                            <Checkbox
                              name="subDistrict"
                              value={item.subDistrictId}
                              checked={selectedSubDistricts.some(
                                (a) => a.subDistrictId === item.subDistrictId
                              )}
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
                                    selectedSubDistricts.filter(
                                      (item) =>
                                        item?.subDistrictId !==
                                        Number(event?.target?.value)
                                    )
                                  );
                                }
                              }}
                            />
                          }
                          multiline
                          className="pl-12"
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
                selectedMunicipalityCities.some((a) => a.title === item.title)
              }
              onChangeHandler={(item, isChecked, value) => {
                if (isChecked) {
                  setSelectedMunicipalityCities([
                    ...selectedMunicipalityCities,
                    item,
                  ]);
                } else {
                  setSelectedMunicipalityCities(
                    selectedMunicipalityCities.filter((item) => {
                      return item?.id !== Number(value);
                    })
                  );
                }
              }}
            />
          </ModalSection>
        ) : (
          <>
            <ModalSection title="პოპულარული ქალაქები">
              <div className="grid grid-cols-2 gap-2 mx-6">
                {locationChain.visibleCities.map((item) => {
                  const isWithDistricts = item.districts.length;
                  return (
                    <Chip
                      key={item.cityId}
                      mode="elevated"
                      Component="label"
                      className={
                        "!bg-[--tg-theme-secondary-bg-color] whitespace-nowrap p-4"
                      }
                      after={
                        isWithDistricts ? (
                          <span className="material-symbols-outlined -mt-[1.5px]">
                            keyboard_arrow_right
                          </span>
                        ) : (
                          <Radio
                            name="favCity"
                            onChange={() => setSelectedFavCity(item as City)}
                            className="block -mt-[1.5px] p-[2px]"
                          />
                        )
                      }
                      onClick={
                        isWithDistricts
                          ? () => {
                              setSelectedFavCity(item as City);
                              setCityDistricts(item.districts as District[]);
                            }
                          : undefined
                      }
                    >
                      {item.cityTitle}
                    </Chip>
                  );
                })}
                {locationChain.visibleMunicipalitetyChain.map((item) => {
                  const isWithCities = item.cities.length;
                  return (
                    <Chip
                      key={item.municipalityId}
                      mode="elevated"
                      Component="label"
                      className={
                        "!bg-[--tg-theme-secondary-bg-color] whitespace-nowrap p-4"
                      }
                      after={
                        isWithCities ? (
                          <span className="material-symbols-outlined block -mt-[1.5px]">
                            keyboard_arrow_right
                          </span>
                        ) : (
                          <Radio
                            name="favCity"
                            onChange={() =>
                              setSelectedMunicipality(item as Municipality)
                            }
                            className="block -mt-[1.5px] p-[2px]"
                          />
                        )
                      }
                      onClick={
                        isWithCities
                          ? () => {
                              setSelectedMunicipality(item as Municipality);
                              setMunicipalityCities(
                                item.cities as MunicipalityCity[]
                              );
                            }
                          : undefined
                      }
                    >
                      {item.municipalityTitle}
                    </Chip>
                  );
                })}
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
