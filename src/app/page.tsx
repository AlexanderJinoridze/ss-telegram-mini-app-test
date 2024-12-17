"use client";

import {
  Section,
  Cell,
  List,
  Modal,
  FixedLayout,
  Button,
  Divider,
  Radio,
  Caption,
  TabsList,
  Subheadline,
} from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";
import { SectionHeader } from "@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionHeader/SectionHeader";
import Script from "next/script";
import { SDKProvider, useHapticFeedback } from "@telegram-apps/sdk-react";
import ModalFooter from "@/components/ModalFooter";
import ModalHeader from "@/components/ModalHeader";
import LocationModal from "@/components/LocationModal";
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

  const [selectedPriceType, setSelectedPriceType] = useState<number>(1);
  const [selectedCurrency, setSelectedCurrency] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const hapticFeedback = useHapticFeedback();
  const hookForm = useForm();

  useEffect(() => {
    if (!isOpen) {
      hapticFeedback.impactOccurred("medium");
    }
  }, [isOpen]);

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
              header={
                <ModalHeader
                  title="გარიგების ტიპი"
                  onClear={() => setDealTypeShadow(undefined)}
                />
              }
              trigger={
                <div className="contents">
                  <ModalTrigger
                    label="გარიგების ტიპი"
                    isSelected={dealType !== undefined}
                    selectedLabel={dealType?.label}
                  />
                </div>
              }
              onOpenChange={(open) => {
                setIsOpen(open);
                setDealTypeShadow(dealType);
              }}
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
              <ModalFooter onClick={() => setDealType(dealTypeShadow)} />
            </Modal>
          </Section>
          <Section footer="სტატუსი ხელმისაწვდომია კერძო სახლის, ბინის, კომერციული ფართის და აგარაკის ქონების ტიპებისთვის">
            <Modal
              header={
                <ModalHeader
                  title="ქონების ტიპი"
                  onClear={() => {
                    setStatusesShadow([]);
                    setPropertyTypeShadow(undefined);
                  }}
                />
              }
              trigger={
                <div className="contents">
                  <ModalTrigger
                    label="ქონების ტიპი"
                    isSelected={propertyType !== undefined}
                    selectedLabel={propertyType?.label}
                  />
                </div>
              }
              onOpenChange={(open) => {
                setIsOpen(open);
                setPropertyTypeShadow(propertyType);
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
              <ModalFooter
                onClick={() => {
                  setStatuses([]);
                  setPropertyType(propertyTypeShadow);
                }}
              />
            </Modal>
            {propertyType !== undefined &&
            propertyTypeStatusMap[propertyType.id] !== undefined ? (
              <Modal
                header={
                  <ModalHeader
                    title="სტატუსი"
                    onClear={() => setStatusesShadow([])}
                  />
                }
                trigger={
                  <div className="contents">
                    <ModalTrigger
                      label="სტატუსი"
                      isSelected={!!statuses.length}
                      selectedLabel={statuses
                        .map((item) => item.label)
                        .join(", ")}
                    />
                  </div>
                }
                onOpenChange={(open) => {
                  setIsOpen(open);
                  setStatusesShadow([...statuses]);
                }}
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
                <ModalFooter onClick={() => setStatuses(statusesShadow)} />
              </Modal>
            ) : (
              <ModalTrigger label="სტატუსი" isDisabled />
            )}
          </Section>
          <Section>
            <Modal
              header={
                <ModalHeader
                  title="მდებარეობა"
                  onClear={() => {
                    setFavoriteCityShadow(undefined);
                    setMunicipalityShadow(undefined);
                    setMunicipalityCitiesShadow([]);
                    setSubDistrictsShadow([]);
                    setStreetsShadow([]);

                    setCityDistrictsList([]);
                    setStreetsList([]);
                    setShowStreetPage(false);
                  }}
                />
              }
              trigger={
                <div className="contents">
                  <ModalTrigger
                    label="მდებარეობა"
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
                        ? municipalityCities
                            .map((item) => item.title)
                            .join(", ")
                        : null,
                      favoriteCity?.cityTitle,
                      subDistricts.length
                        ? subDistricts
                            .map((item) => item.subDistrictTitle)
                            .join(", ")
                        : null,
                      streets.length
                        ? streets.map((item) => item.streetTitle).join(", ")
                        : null,
                    ]
                      .filter((item) => item)
                      .join(" - ")}
                  />
                </div>
              }
              onOpenChange={(open) => {
                setIsOpen(open);

                setMunicipalityShadow(municipality);
                setMunicipalityCitiesShadow(municipalityCities);
                setFavoriteCityShadow(favoriteCity);
                setSubDistrictsShadow(subDistricts);
                setStreetsShadow(streets);
              }}
              className="location-modal h-full"
            >
              <LocationModal
                municipalityShadow={municipalityShadow}
                setMunicipalityShadow={setMunicipalityShadow}
                municipalityCitiesShadow={municipalityCitiesShadow}
                setMunicipalityCitiesShadow={setMunicipalityCitiesShadow}
                favoriteCityShadow={favoriteCityShadow}
                setFavoriteCityShadow={setFavoriteCityShadow}
                subDistrictsShadow={subDistrictsShadow}
                setSubDistrictsShadow={setSubDistrictsShadow}
                streetsShadow={streetsShadow}
                setStreetsShadow={setStreetsShadow}
                cityDistrictsList={cityDistrictsList}
                setCityDistrictsList={setCityDistrictsList}
                municipalityCitiesList={municipalityCitiesList}
                setMunicipalityCitiesList={setMunicipalityCitiesList}
                streetsList={streetsList}
                setStreetsList={setStreetsList}
                showStreetPage={showStreetPage}
                setShowStreetPage={setShowStreetPage}
              />
              <ModalFooter
                onClick={() => {
                  setMunicipality(municipalityShadow);
                  setMunicipalityCities(municipalityCitiesShadow);
                  setFavoriteCity(favoriteCityShadow);
                  setSubDistricts(subDistrictsShadow);
                  setStreets(streetsShadow);
                }}
              />
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
              header={
                <ModalHeader
                  title="ოთახების რაოდენობა"
                  onClear={() => setRoomsShadow([])}
                />
              }
              trigger={
                <div className="contents">
                  <ModalTrigger
                    label="ოთახების რაოდენობა"
                    isSelected={!!rooms.length}
                    selectedLabel={rooms.map((room) => room.label).join(", ")}
                  />
                </div>
              }
              onOpenChange={(open) => {
                setIsOpen(open);
                setRoomsShadow([...rooms]);
              }}
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
              <ModalFooter onClick={() => setRooms(roomsShadow)} />
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
            stretched
          >
            გაგზავნა
          </Button>
        </FixedLayout>
      </form>
    </SDKProvider>
  );
}
