import { FC, ReactNode } from "react";
import { Input } from "@telegram-apps/telegram-ui";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { usePlatform } from "@/hooks/usePlatform";
import { useHapticFeedback } from "@telegram-apps/sdk-react";
import { numberPattern } from "@/app/_assets/constants";

export interface RangeInputProps {
  after: ReactNode;
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
  const invalidInputClass = (fieldName: string) =>
    platform === "ios" && hookForm.formState.errors[fieldName]
      ? "!rounded-inherit !shadow-invalid_input"
      : undefined;
  const validateTo = (to: any, from: any) => !from || !to || Number(from) <= to;
  const validateFrom = (from: any, to: any) =>
    !from || !to || from <= Number(to);
  const compareRange = (priceType: string, from: any, to: any) => {
    if (
      numberPattern.test(hookForm.getValues()[priceType]) &&
      hookForm.formState.isSubmitted
    ) {
      if (!from || !to || Number(from) <= Number(to)) {
        hookForm.clearErrors(priceType);
      } else {
        hookForm.setError(priceType, { type: "manual" });
      }
    }
  };

  return (
    <>
      {inputNames.map((inputName, index, arr) => {
        const isFrom = index === 0;
        const secondaryInputName = arr[isFrom ? 1 : 0];
        return (
          <Input
            key={inputName}
            placeholder={isFrom ? "-დან" : "-მდე"}
            inputMode="numeric"
            after={after}
            status={hookForm.formState.errors[inputName] ? "error" : "default"}
            className={invalidInputClass(inputName)}
            onClick={() => hapticFeedback.selectionChanged()}
            {...hookForm.register(inputName, {
              pattern: numberPattern,
              validate: (value) =>
                (isFrom ? validateFrom : validateTo)(
                  value,
                  hookForm.getValues()[secondaryInputName]
                ),
              onChange: () =>
                compareRange(
                  secondaryInputName,
                  hookForm.getValues()[arr[0]],
                  hookForm.getValues()[arr[1]]
                ),
            })}
          />
        );
      })}
    </>
  );
};
