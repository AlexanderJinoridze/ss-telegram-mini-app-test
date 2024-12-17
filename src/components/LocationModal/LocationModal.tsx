import {
  Badge,
  Button,
  Divider,
  IconButton,
  Input,
} from "@telegram-apps/telegram-ui";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
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

export interface LocationModalProps {
  municipalityShadow?: Municipality;
  setMunicipalityShadow: Dispatch<
    SetStateAction<LocationModalProps["municipalityShadow"]>
  >;
  municipalityCitiesShadow: MunicipalityCity[];
  setMunicipalityCitiesShadow: Dispatch<
    SetStateAction<LocationModalProps["municipalityCitiesShadow"]>
  >;
  favoriteCityShadow?: City;
  setFavoriteCityShadow: Dispatch<
    SetStateAction<LocationModalProps["favoriteCityShadow"]>
  >;
  subDistrictsShadow: SubDistrict[];
  setSubDistrictsShadow: Dispatch<
    SetStateAction<LocationModalProps["subDistrictsShadow"]>
  >;
  streetsShadow: Street[];
  setStreetsShadow: Dispatch<
    SetStateAction<LocationModalProps["streetsShadow"]>
  >;
  cityDistrictsList: District[];
  setCityDistrictsList: Dispatch<
    SetStateAction<LocationModalProps["cityDistrictsList"]>
  >;
  municipalityCitiesList: MunicipalityCity[];
  setMunicipalityCitiesList: Dispatch<
    SetStateAction<LocationModalProps["municipalityCitiesList"]>
  >;
  streetsList: Street[];
  setStreetsList: Dispatch<SetStateAction<LocationModalProps["streetsList"]>>;
  showStreetPage: boolean;
  setShowStreetPage: Dispatch<
    SetStateAction<LocationModalProps["showStreetPage"]>
  >;
}

export const LocationModal: FC<LocationModalProps> = ({
  municipalityShadow,
  setMunicipalityShadow,
  municipalityCitiesShadow,
  setMunicipalityCitiesShadow,
  favoriteCityShadow,
  setFavoriteCityShadow,
  subDistrictsShadow,
  setSubDistrictsShadow,
  streetsShadow,
  setStreetsShadow,

  cityDistrictsList,
  setCityDistrictsList,
  municipalityCitiesList,
  setMunicipalityCitiesList,
  streetsList,
  setStreetsList,
  showStreetPage,
  setShowStreetPage,
}) => {
  useEffect(() => {
    console.log("municipalityShadow", municipalityShadow);
    console.log("municipalityCitiesShadow", municipalityCitiesShadow);
    console.log("favoriteCityShadow", favoriteCityShadow);
    console.log("subDistrictsShadow", subDistrictsShadow);
    console.log("streetsShadow", streetsShadow);
  }, [
    municipalityShadow,
    municipalityCitiesShadow,
    favoriteCityShadow,
    subDistrictsShadow,
    streetsShadow,
  ]);

  return (
    <>
      <div>
        <div className="[&>label]:shadow-input_border [&>label]:focus:shadow-input_border_focused mb-4 [&>div]:mx-input_border_width [&>div]:py-input_border_width [&>div]:px-6 [&>label]:rounded-input">
          <Input
            before={<span className="material-symbols-outlined">search</span>}
            placeholder="ჩაწერე რაიონი, ქალაქი, უბანი ან ქუჩა"
          />
        </div>
        <div className="flex [&:empty]:hidden gap-2 flex-shrink-0 items-center h-9 box-content px-6 pb-4">
          {(subDistrictsShadow &&
            favoriteCityShadow &&
            favoriteCityShadow.districts.length) ||
          municipalityShadow ? (
            <IconButton
              size="s"
              mode="bezeled"
              onClick={() => {
                if (municipalityShadow) {
                  setMunicipalityCitiesList([]);
                  setMunicipalityShadow(undefined);
                  setMunicipalityCitiesShadow([]);
                } else if (showStreetPage) {
                  setSubDistrictsShadow([]);
                  setShowStreetPage(false);
                  setStreetsShadow([]);
                  setStreetsList([]);
                } else {
                  setFavoriteCityShadow(undefined);
                  setSubDistrictsShadow([]);
                  setCityDistrictsList([]);
                  setShowStreetPage(false);
                  setStreetsList([]);
                }
              }}
            >
              <span className="material-symbols-outlined">
                keyboard_arrow_left
              </span>
            </IconButton>
          ) : null}
          <BreadcrumbItem
            isSelected={showStreetPage && !!streetsShadow.length}
            isNotSelected={showStreetPage}
            selectedLabel={streetsShadow
              .map((item) => item.streetTitle)
              .join(", ")}
            notSelectedLabel={subDistrictsShadow
              .map((item) => item.subDistrictTitle)
              .join(", ")}
            onClick={() => setStreetsShadow([])}
          />
          <BreadcrumbItem
            isSelected={!showStreetPage && !!subDistrictsShadow.length}
            isNotSelected={
              !showStreetPage && !!favoriteCityShadow?.districts.length
            }
            selectedLabel={subDistrictsShadow
              .map((item) => item.subDistrictTitle)
              .join(", ")}
            notSelectedLabel={favoriteCityShadow?.cityTitle ?? ""}
            onClick={() => {
              setSubDistrictsShadow([]);
              setStreetsList([]);
            }}
          />
          <BreadcrumbItem
            isSelected={!!municipalityCitiesShadow.length}
            isNotSelected={!!municipalityShadow}
            selectedLabel={municipalityCitiesShadow
              .map((item) => item.title)
              .join(", ")}
            notSelectedLabel={municipalityShadow?.municipalityTitle ?? ""}
            onClick={() => setMunicipalityCitiesShadow([])}
          />
          {streetsList.length && !showStreetPage ? (
            <Button
              size="s"
              mode="bezeled"
              className="shrink-0 pr-[3px] ml-auto"
              onClick={() => setShowStreetPage(true)}
              before={
                <span className="material-symbols-outlined">location_on</span>
              }
            >
              ქუჩები
              <Badge type="number" className="bg-amber-400 text-zinc-950">
                {streetsList.length}
              </Badge>
            </Button>
          ) : null}
        </div>
        <Divider />
      </div>
      <div className="flex flex-col justify-between items-center overflow-auto">
        {showStreetPage ? (
          <ModalSection>
            <AlphabeticalList
              list={streetsList}
              idField="streetId"
              titleField="streetTitle"
              isChecked={(item) =>
                !!find(streetsShadow, (a: any) => a.streetId === item.streetId)
              }
              changeHandler={(item, value, isChecked) => {
                setStreetsShadow(
                  isChecked
                    ? [...streetsShadow, item]
                    : filter(
                        streetsShadow,
                        (item) => item?.streetId !== Number(value)
                      )
                );
              }}
            />
          </ModalSection>
        ) : cityDistrictsList.length ? (
          <ModalSection>
            <GroupedList
              list={cityDistrictsList}
              isChecked={(item) =>
                !!find(
                  subDistrictsShadow,
                  (a: any) => a.subDistrictId === item.subDistrictId
                )
              }
              changeHandler={(item, value, checked) => {
                setSubDistrictsShadow(
                  checked
                    ? [...subDistrictsShadow, item]
                    : filter(
                        subDistrictsShadow,
                        (item) => item?.subDistrictId !== Number(value)
                      )
                );
                setStreetsList(
                  checked
                    ? [...streetsList, ...item.streets]
                    : difference(streetsList, item.streets)
                );
              }}
              groupChangeHandler={(item, value, checked) => {
                const normalizeDistrictsList = item.subDistricts
                  .map((item) => item.streets)
                  .flat();
                setSubDistrictsShadow(
                  checked
                    ? union(subDistrictsShadow, item.subDistricts)
                    : subDistrictsShadow.filter(
                        (item) =>
                          !value
                            .split(",")
                            .includes(String(item?.subDistrictId))
                      )
                );
                setStreetsList(
                  checked
                    ? union(streetsList, normalizeDistrictsList)
                    : difference(streetsList, normalizeDistrictsList)
                );
              }}
            />
          </ModalSection>
        ) : municipalityCitiesList.length ? (
          <ModalSection>
            <AlphabeticalList
              list={municipalityCitiesList}
              isChecked={(item) =>
                !!find(municipalityCitiesShadow, (a: any) => a.id === item.id)
              }
              changeHandler={(item, value, isChecked) => {
                setMunicipalityCitiesShadow(
                  isChecked
                    ? [...municipalityCitiesShadow, item]
                    : filter(
                        municipalityCitiesShadow,
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
                favoriteCityShadow={favoriteCityShadow}
                popularCities={locationChain.visibleCities}
                popularMunicipalities={locationChain.visibleMunicipalitetyChain}
                setCityDistrictsList={setCityDistrictsList}
                setMunicipalityCitiesList={setMunicipalityCitiesList}
                setFavoriteCityShadow={setFavoriteCityShadow}
                setMunicipalityShadow={setMunicipalityShadow}
              />
            </ModalSection>
            <ModalSection title="მუნიციპალიტეტები">
              <AlphabeticalList
                list={locationChain.municipalityChain}
                idField="municipalityId"
                titleField="municipalityTitle"
                clickHandler={(item) => {
                  setMunicipalityShadow(item as Municipality);
                  setMunicipalityCitiesList(item.cities as MunicipalityCity[]);
                }}
              />
            </ModalSection>
          </>
        )}
      </div>
    </>
  );
};
