import {
  Badge,
  Button,
  Divider,
  IconButton,
  Input,
  Text,
} from "@telegram-apps/telegram-ui";
import { FC, useEffect, useState } from "react";
import ModalSection from "../ModalSection";
import locationChain from "../../app/_assets/locationChain.json";
import union from "lodash.union";
import difference from "lodash.difference";
import find from "lodash.find";
import filter from "lodash.filter";
import AlphabeticalList from "../AlphabeticalList";
import PopularLocations from "../PopularLocations";
import {
  City,
  District,
  Municipality,
  MunicipalityCity,
  Street,
  SubDistrict,
} from "@/types";
import GroupedList from "../GroupedList";
import BreadcrumbItem from "../BreadcrumbItem";

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
      <div className="sticky top-0 z-10 bg-[--tgui--bg_color]">
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

          <BreadcrumbItem
            isSelected={showStreets && !!selectedStreets.length}
            isNotSelected={showStreets}
            selectedLabel={selectedStreets
              .map((item) => item.streetTitle)
              .join(", ")}
            notSelectedLabel={selectedSubDistricts
              .map((item) => item.subDistrictTitle)
              .join(", ")}
            onClick={() => setSelectedStreets([])}
          />
          <BreadcrumbItem
            isSelected={!showStreets && !!selectedSubDistricts.length}
            isNotSelected={
              !showStreets &&
              !!selectedFavCity?.districts.length
            }
            selectedLabel={selectedSubDistricts
              .map((item) => item.subDistrictTitle)
              .join(", ")}
            notSelectedLabel={selectedFavCity?.cityTitle ?? ""}
            onClick={() => {
              setSelectedSubDistricts([]);
              setStreets([]);
            }}
          />
          <BreadcrumbItem
            isSelected={!!selectedMunicipalityCities.length}
            isNotSelected={!!selectedMunicipality}
            selectedLabel={selectedMunicipalityCities
              .map((item) => item.title)
              .join(", ")}
            notSelectedLabel={selectedMunicipality?.municipalityTitle ?? ""}
            onClick={() => setSelectedMunicipalityCities([])}
          />

          {streets.length && !showStreets ? (
            <Button
              size="s"
              mode="bezeled"
              className="shrink-0 pr-[3px] ml-auto"
              onClick={() => setShowStreets(true)}
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
        </div>
        <Divider />
      </div>
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
            <GroupedList
              list={cityDistricts}
              isChecked={(item) =>
                !!find(
                  selectedSubDistricts,
                  (a: any) => a.subDistrictId === item.subDistrictId
                )
              }
              changeHandler={(item, value, checked) => {
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
              groupChangeHandler={(item, value, checked) => {
                const normalizeDistrictsList = item.subDistricts
                  .map((item) => item.streets)
                  .flat();
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
                    ? union(streets, normalizeDistrictsList)
                    : difference(streets, normalizeDistrictsList)
                );
              }}
            />
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
              <PopularLocations
                popularCities={locationChain.visibleCities}
                popularMunicipalities={locationChain.visibleMunicipalitetyChain}
                setCityDistricts={setCityDistricts}
                setMunicipalityCities={setMunicipalityCities}
                setSelectedFavCity={setSelectedFavCity}
                setSelectedMunicipality={setSelectedMunicipality}
              />
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
    </>
  );
};
