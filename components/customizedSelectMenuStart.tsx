"use client";

import { ControllerFieldState } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { times } from "@/constants/constants";

export function CustomizedSelectMenuStart({
  id,
  field,
  fieldState,
  plcaeHolder,
  endTime,
  disabledByRow
}: {
  id: string;
  field: {
    value: string;
    onChange: (value: string) => void;
    name: string;
  };
  fieldState: ControllerFieldState;
  plcaeHolder: string;
  endTime: string;
  disabledByRow: boolean;
}) {
  console.log(endTime);

  return (
    <Select
      disabled={disabledByRow}
      name={field.name}
      onValueChange={field.onChange}
      value={field.value}
      defaultValue={field.value}
    >
      <SelectTrigger
        id={id}
        className="w-[180px]"
        aria-invalid={fieldState.invalid}
      >
        <SelectValue placeholder={plcaeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {times.map((time) => {
            return (
              <SelectItem key={time} value={time} disabled={endTime! >= time}>
                {time}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
