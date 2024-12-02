import {
  Badge,
  Button,
  Cell,
  Checkbox,
  Chip,
  IconButton,
  Radio,
  Section,
  Subheadline,
  Text,
} from "@telegram-apps/telegram-ui";
import { FC, Fragment, useEffect, useState } from "react";
import ModalSection from "../ModalSection";
import locationChain from "../../app/_assets/locationChain.json";
import { SectionHeader } from "@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionHeader/SectionHeader";
import union from "lodash.union";
import difference from "lodash.difference";

type Street = {
  streetId: number;
  streetTitle: string;
  latitude: string | null;
  longitude: string | null;
};

type SubDistrict = {
  subDistrictId: number;
  subDistrictTitle: string;
  subDistrictTitleSeo: string;
  latitude: string | null;
  longitude: string | null;
  streets: Street[];
};

type District = {
  districtId: number;
  districtTitle: string;
  latitude: string | null;
  longitude: string | null;
  subDistricts: SubDistrict[];
};

type City = {
  cityId: number;
  cityTitle: string;
  latitude: null;
  longitude: null;
  districts: District[];
};

type MunicipalityCity = {
  id: number;
  title: string;
  latitude: null;
  longitude: null;
};

type Municipality = {
  municipalityId: number;
  municipalityTitle: string;
  latitude: null;
  longitude: null;
  cities: MunicipalityCity[];
};

export const LocationModal: FC = () => {
  let currentLetter = "";

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

  const sortAlphabetically = (fieldName: string) => (a: any, b: any) => {
    if (a[fieldName] < b[fieldName]) {
      return -1;
    }
    if (a[fieldName] > b[fieldName]) {
      return 1;
    }
    return 0;
  };

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
              <Subheadline>
                {selectedSubDistricts
                  .map((item) => item.subDistrictTitle)
                  .join(", ")}
              </Subheadline>
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
          <strong>{selectedFavCity.cityTitle}</strong>
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
            onClick={() => {
              setSelectedMunicipalityCities([]);
            }}
          >
            {selectedMunicipalityCities.map((item) => item.title).join(", ")}
          </Button>
        ) : selectedMunicipality ? (
          <strong>{selectedMunicipality.municipalityTitle}</strong>
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
            <Section className="flex flex-col">
              {streets.sort(sortAlphabetically("streetTitle")).map((item) => {
                const municipalityCityTitle = item.streetTitle;
                const firstLetter = municipalityCityTitle.charAt(0);

                return (
                  <Fragment key={item.streetId}>
                    {currentLetter !== firstLetter
                      ? ((currentLetter = firstLetter),
                        (<SectionHeader>{firstLetter}</SectionHeader>))
                      : null}
                    <Cell
                      Component="label"
                      after={
                        <Checkbox
                          value={item.streetId}
                          checked={selectedStreets.some(
                            (a) => a.streetTitle === item.streetTitle
                          )}
                          onChange={(event) => {
                            const isChecked = event.target.checked;

                            if (isChecked) {
                              setSelectedStreets([...selectedStreets, item]);
                            } else {
                              setSelectedStreets(
                                selectedStreets.filter((item) => {
                                  return (
                                    item?.streetId !==
                                    Number(event?.target?.value)
                                  );
                                })
                              );
                            }
                          }}
                        />
                      }
                      multiline
                    >
                      {municipalityCityTitle}
                    </Cell>
                  </Fragment>
                );
              })}
            </Section>
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
            <Section className="flex flex-col">
              {municipalityCities
                .sort(sortAlphabetically("title"))
                .map((item) => {
                  const municipalityCityTitle = item.title;
                  const firstLetter = municipalityCityTitle.charAt(0);

                  return (
                    <Fragment key={item.id}>
                      {currentLetter !== firstLetter
                        ? ((currentLetter = firstLetter),
                          (<SectionHeader>{firstLetter}</SectionHeader>))
                        : null}
                      <Cell
                        Component="label"
                        after={
                          <Checkbox
                            value={item.id}
                            checked={selectedMunicipalityCities.some(
                              (a) => a.title === item.title
                            )}
                            onChange={(event) => {
                              const isChecked = event.target.checked;

                              if (isChecked) {
                                setSelectedMunicipalityCities([
                                  ...selectedMunicipalityCities,
                                  item,
                                ]);
                              } else {
                                setSelectedMunicipalityCities(
                                  selectedMunicipalityCities.filter((item) => {
                                    return (
                                      item?.id !== Number(event?.target?.value)
                                    );
                                  })
                                );
                              }
                            }}
                          />
                        }
                        multiline
                      >
                        {municipalityCityTitle}
                      </Cell>
                    </Fragment>
                  );
                })}
            </Section>
          </ModalSection>
        ) : (
          <>
            <ModalSection title="პოპულარული ქალაქები">
              <div className="grid grid-cols-2 gap-2 mx-4">
                {locationChain.visibleCities.map((item) => {
                  const isWithDistricts = item.districts.length;
                  return (
                    <Chip
                      key={item.cityId}
                      mode="elevated"
                      Component="label"
                      after={
                        isWithDistricts ? null : (
                          <Radio
                            name="favCity"
                            onChange={() => setSelectedFavCity(item as City)}
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
                      after={
                        isWithCities ? null : (
                          <Radio
                            name="favCity"
                            onChange={() =>
                              setSelectedMunicipality(item as Municipality)
                            }
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
              <Section className="flex flex-col">
                {locationChain.municipalityChain
                  .sort(sortAlphabetically("municipalityTitle"))
                  .map((item) => {
                    const municipalityTitle = item.municipalityTitle;
                    const firstLetter = municipalityTitle.charAt(0);

                    return (
                      <Fragment key={item.municipalityId}>
                        {currentLetter !== firstLetter
                          ? ((currentLetter = firstLetter),
                            (<SectionHeader>{firstLetter}</SectionHeader>))
                          : null}
                        <Cell
                          Component="label"
                          multiline
                          onClick={() => {
                            setSelectedMunicipality(item as Municipality);
                            setMunicipalityCities(
                              item.cities as MunicipalityCity[]
                            );
                          }}
                        >
                          {municipalityTitle}
                        </Cell>
                      </Fragment>
                    );
                  })}
              </Section>
            </ModalSection>
          </>
        )}
      </div>
    </>
  );
};
