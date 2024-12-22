"use client";

import {
  Section,
  Cell,
  List,
  FixedLayout,
  Button,
  Divider,
  Radio,
  Caption,
  TabsList,
  Subheadline,
  Input,
  IconButton,
  Badge,
} from "@telegram-apps/telegram-ui";
import { useState } from "react";
import { SectionHeader } from "@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionHeader/SectionHeader";
import Script from "next/script";
import { SDKProvider, useHapticFeedback } from "@telegram-apps/sdk-react";
import locationChain from "./_assets/locationChain.json";
import { SectionFooter } from "@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionFooter/SectionFooter";
import { TabsItem } from "@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/components/TabsItem/TabsItem";
import { useForm } from "react-hook-form";
import ModalCell from "@/components/ModalCell";
import {
  City,
  District,
  Municipality,
  MunicipalityCity,
  Street,
  SubDistrict,
  valueOf,
} from "@/types";
import {
  currencies,
  dealTypeMap,
  ownerLogosMap,
  priceTypes,
  propertyTypeMap,
  propertyTypeStatusMap,
  roomsMap,
} from "./_assets/constants";
import { RangeInput } from "@/components/RangeInput/RangeInput";
import ModalTrigger from "@/components/ModalTrigger";
import OwnerLogo from "@/components/OwnerLogo";
import FormHeader from "@/components/FormHeader";
import BreadcrumbItem from "@/components/BreadcrumbItem";
import ModalSection from "@/components/ModalSection";
import AlphabeticalList from "@/components/AlphabeticalList";
import find from "lodash.find";
import filter from "lodash.filter";
import GroupedList from "@/components/GroupedList";
import difference from "lodash.difference";
import union from "lodash.union";
import PopularLocations from "@/components/PopularLocations";
import Modal from "@/components/Modal";

export default function Home() {
  const [dealType, setDealType] = useState<(typeof dealTypeMap)[number]>();
  const [propertyType, setPropertyType] =
    useState<(typeof propertyTypeMap)[number]>();
  const [statuses, setStatuses] = useState<
    valueOf<typeof propertyTypeStatusMap>
  >([]);
  const [rooms, setRooms] = useState<typeof roomsMap>([]);
  const [municipality, setMunicipality] = useState<Municipality>();
  const [municipalityCities, setMunicipalityCities] = useState<
    MunicipalityCity[]
  >([]);
  const [favoriteCity, setFavoriteCity] = useState<City>();
  const [subDistricts, setSubDistricts] = useState<SubDistrict[]>([]);
  const [streets, setStreets] = useState<Street[]>([]);
  const [dealTypeShadow, setDealTypeShadow] = useState<typeof dealType>();
  const [propertyTypeShadow, setPropertyTypeShadow] =
    useState<typeof propertyType>();
  const [statusesShadow, setStatusesShadow] = useState<typeof statuses>([]);
  const [roomsShadow, setRoomsShadow] = useState<typeof rooms>([]);
  const [municipalityShadow, setMunicipalityShadow] =
    useState<typeof municipality>();
  const [municipalityCitiesShadow, setMunicipalityCitiesShadow] = useState<
    typeof municipalityCities
  >([]);
  const [favoriteCityShadow, setFavoriteCityShadow] =
    useState<typeof favoriteCity>();
  const [subDistrictsShadow, setSubDistrictsShadow] = useState<
    typeof subDistricts
  >([]);
  const [streetsShadow, setStreetsShadow] = useState<typeof streets>([]);

  const [cityDistrictsList, setCityDistrictsList] = useState<District[]>([]);
  const [municipalityCitiesList, setMunicipalityCitiesList] = useState<
    MunicipalityCity[]
  >([]);
  const [streetsList, setStreetsList] = useState<Street[]>([]);
  const [showStreetPage, setShowStreetPage] = useState<boolean>(false);

  const [cityDistrictsListShadow, setCityDistrictsListShadow] = useState<
    typeof cityDistrictsList
  >([]);
  const [municipalityCitiesListShadow, setMunicipalityCitiesListShadow] =
    useState<typeof municipalityCitiesList>([]);
  const [streetsListShadow, setStreetsListShadow] = useState<
    typeof streetsList
  >([]);
  const [showStreetPageShadow, setShowStreetPageShadow] =
    useState<typeof showStreetPage>(false);

  const [showStreetPageButton, setShowStreetPageButton] = useState(false);
  const [showStreetPageButtonShadow, setShowStreetPageButtonShadow] =
    useState<typeof showStreetPageButton>(false);

  const [selectedPriceType, setSelectedPriceType] = useState<number>(1);
  const [selectedCurrency, setSelectedCurrency] = useState<number>(1);

  const hapticFeedback = useHapticFeedback();
  const hookForm = useForm();

  return (
    <SDKProvider>
      <Script src="https://telegram.org/js/telegram-web-app.js" />
      <form
        onSubmit={hookForm.handleSubmit(() => {})}
        className="flex flex-col"
      >
        <List className="!mb-48">
          <FormHeader />
          <Section>
            <Modal
              title="გარიგების ტიპი"
              onClear={() => setDealTypeShadow(undefined)}
              isSelected={dealType !== undefined}
              selectedLabel={dealType?.label}
              onOpenChange={() => setDealTypeShadow(dealType)}
              onSelect={() => setDealType(dealTypeShadow)}
            >
              {dealTypeMap.map((item) => (
                <ModalCell
                  key={item.id}
                  isSelected={item.id === dealTypeShadow?.id}
                  clickHandler={(isSelected) =>
                    setDealTypeShadow(isSelected ? undefined : item)
                  }
                >
                  {item.label}
                </ModalCell>
              ))}
            </Modal>
          </Section>
          <Section footer="სტატუსი ხელმისაწვდომია კერძო სახლის, ბინის, კომერციული ფართის და აგარაკის ქონების ტიპებისთვის">
            <Modal
              title="ქონების ტიპი"
              onClear={() => {
                setStatusesShadow([]);
                setPropertyTypeShadow(undefined);
              }}
              isSelected={propertyType !== undefined}
              selectedLabel={propertyType?.label}
              onOpenChange={() => setPropertyTypeShadow(propertyType)}
              onSelect={() => {
                setStatuses([]);
                setPropertyType(propertyTypeShadow);
              }}
            >
              {propertyTypeMap.map((item) => (
                <ModalCell
                  key={item.id}
                  isSelected={item.id === propertyTypeShadow?.id}
                  before={
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontVariationSettings:
                          item.id === propertyTypeShadow?.id
                            ? '"FILL" 1'
                            : undefined,
                      }}
                    >
                      {item.iconName}
                    </span>
                  }
                  clickHandler={() => {
                    setStatusesShadow([]);
                    setPropertyTypeShadow(
                      item.id === propertyTypeShadow?.id ? undefined : item
                    );
                  }}
                >
                  {item.label}
                </ModalCell>
              ))}
            </Modal>
            {propertyType && propertyTypeStatusMap[propertyType.id] ? (
              <Modal
                title="სტატუსი"
                onClear={() => setStatusesShadow([])}
                isSelected={!!statuses.length}
                selectedLabel={statuses.map((item) => item.label).join(", ")}
                onOpenChange={() => setStatusesShadow([...statuses])}
                onSelect={() => setStatuses(statusesShadow)}
              >
                {propertyTypeStatusMap[propertyType.id].map(({ id, label }) => {
                  const statusIds = statusesShadow.map((status) => status.id);
                  const isChecked = statusIds.includes(id);
                  return (
                    <ModalCell
                      key={id}
                      isChecked={isChecked}
                      value={id}
                      changeHandler={() => {
                        if (isChecked) {
                          statusesShadow.splice(statusIds.indexOf(id), 1);
                          setStatusesShadow([...statusesShadow]);
                        } else {
                          setStatusesShadow([...statusesShadow, { id, label }]);
                        }
                      }}
                    >
                      {label}
                    </ModalCell>
                  );
                })}
              </Modal>
            ) : (
              <ModalTrigger label="სტატუსი" isDisabled />
            )}
          </Section>
          <Section>
            <Modal
              fullHeight
              title="მდებარეობა"
              isSelected={
                !!(
                  municipality ||
                  municipalityCities.length ||
                  favoriteCity ||
                  subDistricts.length ||
                  streets.length
                )
              }
              selectedLabel={[
                municipality?.municipalityTitle,
                municipalityCities.length
                  ? municipalityCities.map((item) => item.title).join(", ")
                  : null,
                favoriteCity?.cityTitle,
                subDistricts.length
                  ? subDistricts.map((item) => item.subDistrictTitle).join(", ")
                  : null,
                streets.length
                  ? streets.map((item) => item.streetTitle).join(", ")
                  : null,
              ]
                .filter((item) => item)
                .join(" - ")}
              onClear={() => {
                setFavoriteCityShadow(undefined);
                setMunicipalityShadow(undefined);
                setMunicipalityCitiesShadow([]);
                setSubDistrictsShadow([]);
                setStreetsShadow([]);
                setCityDistrictsListShadow([]);
                setMunicipalityCitiesListShadow([]);
                setStreetsListShadow([]);
                setShowStreetPageButtonShadow(false);
                setShowStreetPageShadow(false);
              }}
              onOpenChange={() => {
                setMunicipalityShadow(municipality);
                setMunicipalityCitiesShadow(municipalityCities);
                setFavoriteCityShadow(favoriteCity);
                setSubDistrictsShadow(subDistricts);
                setStreetsShadow(streets);
                setCityDistrictsListShadow(cityDistrictsList);
                setMunicipalityCitiesListShadow(municipalityCitiesList);
                setStreetsListShadow(streetsList);
                setShowStreetPageButtonShadow(showStreetPageButton);
                setShowStreetPageShadow(showStreetPage);
              }}
              onSelect={() => {
                setMunicipality(municipalityShadow);
                setMunicipalityCities(municipalityCitiesShadow);
                setFavoriteCity(favoriteCityShadow);
                setSubDistricts(subDistrictsShadow);
                setStreets(streetsShadow);
                setCityDistrictsList(cityDistrictsListShadow);
                setMunicipalityCitiesList(municipalityCitiesListShadow);
                setStreetsList(streetsListShadow);
                setShowStreetPageButton(showStreetPageButtonShadow);
                setShowStreetPage(showStreetPageShadow);
              }}
              header={
                <>
                  <div className="[&_label]:shadow-input_border [&_label:has(input:focus)]:shadow-input_border_focused mb-4 [&>div]:mx-input_border_width [&>div]:py-input_border_width [&>div]:px-6 [&_label]:rounded-input">
                    <Input
                      before={
                        <span className="material-symbols-outlined">
                          search
                        </span>
                      }
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
                            setMunicipalityCitiesListShadow([]);
                            setMunicipalityShadow(undefined);
                            setMunicipalityCitiesShadow([]);
                          } else if (showStreetPageShadow) {
                            setSubDistrictsShadow([]);
                            setStreetsListShadow([]);
                            setShowStreetPageShadow(false);
                            setStreetsShadow([]);
                            setShowStreetPageButtonShadow(false);
                          } else {
                            setFavoriteCityShadow(undefined);
                            setSubDistrictsShadow([]);

                            setCityDistrictsListShadow([]);
                            setStreetsListShadow([]);
                            setShowStreetPageShadow(false);
                            setShowStreetPageButtonShadow(false);
                          }
                        }}
                      >
                        <span className="material-symbols-outlined">
                          keyboard_arrow_left
                        </span>
                      </IconButton>
                    ) : null}
                    <BreadcrumbItem
                      isSelected={
                        showStreetPageShadow && !!streetsShadow.length
                      }
                      isNotSelected={showStreetPageShadow}
                      selectedLabel={streetsShadow
                        .map((item) => item.streetTitle)
                        .join(", ")}
                      notSelectedLabel={subDistrictsShadow
                        .map((item) => item.subDistrictTitle)
                        .join(", ")}
                      onClick={() => setStreetsShadow([])}
                    />
                    <BreadcrumbItem
                      isSelected={
                        !showStreetPageShadow && !!subDistrictsShadow.length
                      }
                      isNotSelected={
                        !showStreetPageShadow &&
                        !!favoriteCityShadow?.districts.length
                      }
                      selectedLabel={subDistrictsShadow
                        .map((item) => item.subDistrictTitle)
                        .join(", ")}
                      notSelectedLabel={favoriteCityShadow?.cityTitle ?? ""}
                      onClick={() => {
                        setSubDistrictsShadow([]);
                        setStreetsListShadow([]);
                        setShowStreetPageButtonShadow(false);
                      }}
                    />
                    <BreadcrumbItem
                      isSelected={!!municipalityCitiesShadow.length}
                      isNotSelected={!!municipalityShadow}
                      selectedLabel={municipalityCitiesShadow
                        .map((item) => item.title)
                        .join(", ")}
                      notSelectedLabel={
                        municipalityShadow?.municipalityTitle ?? ""
                      }
                      onClick={() => setMunicipalityCitiesShadow([])}
                    />
                    {showStreetPageButtonShadow ? (
                      <Button
                        size="s"
                        mode="bezeled"
                        className="shrink-0 pr-[3px] ml-auto"
                        onClick={() => {
                          setShowStreetPageButtonShadow(false);
                          setShowStreetPageShadow(true);
                        }}
                        before={
                          <span className="material-symbols-outlined">
                            location_on
                          </span>
                        }
                      >
                        ქუჩები
                        <Badge
                          type="number"
                          className="bg-amber-400 text-zinc-950"
                        >
                          {streetsListShadow.length}
                        </Badge>
                      </Button>
                    ) : null}
                  </div>
                </>
              }
            >
              {showStreetPageShadow ? (
                <ModalSection>
                  <AlphabeticalList
                    list={streetsListShadow}
                    idField="streetId"
                    titleField="streetTitle"
                    isChecked={(item) =>
                      !!find(streetsShadow, (a) => a.streetId === item.streetId)
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
              ) : cityDistrictsListShadow.length ? (
                <ModalSection>
                  <GroupedList
                    list={cityDistrictsListShadow}
                    isChecked={(item) =>
                      !!find(
                        subDistrictsShadow,
                        (a) => a.subDistrictId === item.subDistrictId
                      )
                    }
                    changeHandler={(item, value, checked) => {
                      const streetsList = checked
                        ? [...streetsListShadow, ...item.streets]
                        : difference(streetsListShadow, item.streets);
                      setSubDistrictsShadow(
                        checked
                          ? [...subDistrictsShadow, item]
                          : filter(
                              subDistrictsShadow,
                              (item) => item?.subDistrictId !== Number(value)
                            )
                      );
                      setStreetsListShadow(streetsList);
                      setShowStreetPageButtonShadow(!!streetsList.length);
                    }}
                    groupChangeHandler={(item, value, checked) => {
                      const normalizeDistrictsList = item.subDistricts
                        .map((item) => item.streets)
                        .flat();
                      const streetsList = checked
                        ? union(streetsListShadow, normalizeDistrictsList)
                        : difference(streetsListShadow, normalizeDistrictsList);
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
                      setStreetsListShadow(streetsList);
                      setShowStreetPageButtonShadow(!!streetsList.length);
                    }}
                  />
                </ModalSection>
              ) : municipalityCitiesListShadow.length ? (
                <ModalSection>
                  <AlphabeticalList
                    list={municipalityCitiesListShadow}
                    isChecked={(item) =>
                      !!find(municipalityCitiesShadow, (a) => a.id === item.id)
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
                      popularMunicipalities={
                        locationChain.visibleMunicipalitetyChain
                      }
                      setCityDistrictsList={setCityDistrictsListShadow}
                      setMunicipalityCitiesList={
                        setMunicipalityCitiesListShadow
                      }
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
                        setMunicipalityCitiesListShadow(
                          item.cities as MunicipalityCity[]
                        );
                      }}
                    />
                  </ModalSection>
                </>
              )}
            </Modal>
          </Section>
          <SectionHeader>ფართი</SectionHeader>
          <Section>
            <RangeInput
              inputNames={["areaFrom", "areaTo"]}
              hookForm={hookForm}
              after="მ²"
            />
          </Section>
          <Section>
            <Modal
              title="ოთახების რაოდენობა"
              onClear={() => setRoomsShadow([])}
              isSelected={!!rooms.length}
              selectedLabel={rooms.map((room) => room.label).join(", ")}
              onOpenChange={() => setRoomsShadow([...rooms])}
              onSelect={() => setRooms(roomsShadow)}
            >
              {roomsMap.map(({ id, label }) => {
                const roomIds = roomsShadow.map((room) => room.id);
                const isSelectedRooms = roomIds.includes(id);
                return (
                  <ModalCell
                    key={id}
                    isChecked={isSelectedRooms}
                    changeHandler={() => {
                      if (isSelectedRooms) {
                        roomsShadow.splice(roomIds.indexOf(id), 1);
                        setRoomsShadow([...roomsShadow]);
                      } else {
                        setRoomsShadow([...roomsShadow, { id, label }]);
                      }
                    }}
                  >
                    {label}
                  </ModalCell>
                );
              })}
            </Modal>
          </Section>
          <SectionHeader>ფასი</SectionHeader>
          <Section>
            {priceTypes.map(({ id, label }) => (
              <Cell
                key={id}
                Component="label"
                onClick={() => hapticFeedback.impactOccurred("soft")}
                after={
                  <Radio
                    onChange={() => setSelectedPriceType(id)}
                    checked={id === selectedPriceType}
                  />
                }
              >
                {label}
              </Cell>
            ))}
          </Section>
          <Section>
            <TabsList className="gap-0 h-12">
              {currencies.map(({ id, label }) => (
                <TabsItem
                  key={id}
                  className="h-12"
                  type="button"
                  onClick={() => {
                    hapticFeedback.impactOccurred("soft");
                    setSelectedCurrency(id);
                  }}
                  selected={id === selectedCurrency}
                >
                  <Subheadline
                    level="1"
                    plain
                    weight={id === selectedCurrency ? "2" : "3"}
                  >
                    {label}
                  </Subheadline>
                </TabsItem>
              ))}
            </TabsList>
            <RangeInput
              inputNames={["priceFrom", "priceTo"]}
              hookForm={hookForm}
              after={selectedCurrency === 1 ? "₾" : "$"}
            />
          </Section>
          <SectionFooter className="flex flex-col items-center mt-8">
            <div className="flex gap-6 mt-4 mb-6 justify-center">
              {ownerLogosMap.map(({ link, w, d }) => (
                <OwnerLogo key={link} link={link} w={w} d={d} />
              ))}
            </div>
            <Caption className="text-[--tg-theme-hint-color]">
              © SS.ge ყველა უფლება დაცულია
            </Caption>
          </SectionFooter>
        </List>
        <FixedLayout className="flex items-stretch flex-col bg-[--tg-theme-header-bg-color]">
          <Divider />
          <Button
            type="submit"
            onClick={() => hapticFeedback.impactOccurred("soft")}
            className="m-5"
            size="l"
          >
            გაგზავნა
          </Button>
        </FixedLayout>
      </form>
    </SDKProvider>
  );
}
