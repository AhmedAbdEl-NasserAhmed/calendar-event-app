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

export function CustomizedSelectMenuEnd({
  id,
  field,
  fieldState,
  plcaeHolder,
  startTime,
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
  disableBefore?: string;
  startTime?: string;
  disabledByRow: boolean;
}) {
  return (
    <Select
      name={field.name}
      onValueChange={field.onChange}
      value={field.value}
      defaultValue={field.value}
    >
      <SelectTrigger
        disabled={!startTime || disabledByRow}
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
              <SelectItem key={time} value={time} disabled={startTime! >= time}>
                {time}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
