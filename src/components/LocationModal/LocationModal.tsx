import {
  Cell,
  Checkbox,
  Chip,
  Radio,
  Section,
  Subheadline,
} from "@telegram-apps/telegram-ui";
import { FC, Fragment, useEffect, useState } from "react";
import ModalSection from "../ModalSection";
import locationChain from "../../app/_assets/locationChain.json";
import { SectionHeader } from "@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionHeader/SectionHeader";

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

  const [selectedFavCity, setSelectedFavCity] = useState<City>();
  const [selectedMunicipality, setSelectedMunicipality] =
    useState<Municipality>();
  const [selectedMunicipalityCities, setSelectedMunicipalityCities] = useState<
    MunicipalityCity[]
  >([]);

  const [cityDistricts, setCityDistricts] = useState<District[]>();
  const [municipalityCities, setMunicipalityCities] =
    useState<MunicipalityCity[]>();

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
  }, [selectedFavCity, selectedMunicipality, selectedMunicipalityCities]);

  return (
    <>
      <input className="w-full" />
      {municipalityCities || cityDistricts ? (
        <button
          onClick={() => {
            setSelectedFavCity(undefined);
            setSelectedMunicipality(undefined);
            setMunicipalityCities(undefined);
            setCityDistricts(undefined);
          }}
        >
          BACK
        </button>
      ) : null}
      <div className="flex flex-col justify-between items-center">
        {cityDistricts ? (
          <ModalSection>
            {cityDistricts.map((item) => {
              return (
                <>
                  <Cell
                    Component="label"
                    after={<Checkbox name="checkbox" value="1" />}
                    multiline
                  >
                    <Subheadline weight="1">{item.districtTitle}</Subheadline>
                  </Cell>
                  <div>
                    {item.subDistricts.map((item) => {
                      return (
                        <Cell
                          Component="label"
                          after={<Checkbox name="checkbox" value="1" />}
                          multiline
                          className="pl-12"
                        >
                          {item.subDistrictTitle}
                        </Cell>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </ModalSection>
        ) : municipalityCities ? (
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
              <div className="grid grid-cols-2 gap-2">
                {locationChain.visibleCities.map((item) => {
                  const isWithDistricts = item.districts.length;
                  return (
                    <Chip
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
