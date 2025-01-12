import { FC } from "react";
import { Divider, Input } from "@telegram-apps/telegram-ui";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { usePlatform } from "@/hooks/usePlatform";
import { useHapticFeedback } from "@telegram-apps/sdk-react";
import { normalizeNumeral, numberPattern } from "@/app/_assets/constants";

export interface RangeInputProps {
  after: string;
  inputNames: string[];
  hookForm: UseFormReturn<FieldValues, any, undefined>;
}

export const RangeInput: FC<RangeInputProps> = ({
  after,
  inputNames,
  hookForm,
}) => {
  const hapticFeedback = useHapticFeedback();
  const platform = usePlatform();

  return (
    <>
      {inputNames.map((inputName, index, inputNames) => {
        const isFrom = index === 0;
        const secondaryInputName = inputNames[isFrom ? 1 : 0];

        return (
          <>
            <Input
              key={inputName}
              placeholder={isFrom ? "-დან" : "-მდე"}
              inputMode="decimal"
              after={<span className="w-6 text-center">{after}</span>}
              status={
                hookForm.formState.errors[inputName] ? "error" : "default"
              }
              className={
                platform === "ios" && hookForm.formState.errors[inputName]
                  ? "!rounded-inherit !shadow-invalid_input"
                  : undefined
              }
              onClick={() => hapticFeedback.selectionChanged()}
              {...hookForm.register(inputName, {
                deps: secondaryInputName,
                validate: (value) => {
                  const primary = value;
                  const secondary = hookForm.getValues()[secondaryInputName];
                  const normalizedPrimary = normalizeNumeral(primary);
                  const normalizedSecondary = normalizeNumeral(secondary);

                  return !numberPattern.test(secondary) &&
                    numberPattern.test(primary)
                    ? true
                    : primary === "" ||
                        (isFrom
                          ? normalizedPrimary <= normalizedSecondary
                          : normalizedPrimary >= normalizedSecondary);
                },
              })}
            />
            {index !== inputNames.length - 1 ? <Divider /> : null}
          </>
        );
      })}
    </>
  );
};
