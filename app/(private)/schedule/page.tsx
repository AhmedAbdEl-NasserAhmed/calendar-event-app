"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CreateScheduleForm } from "./_scheduleForm";
import { useState } from "react";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

type TimeRange = { from: string; to: string };

export type ScheduleData = {
  id: string; // day name
  [day: string]: TimeRange[] | string; // dynamic day property
};

const SchedulePage = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);

  console.log(scheduleData);

  return (
    <Card className="w-3/5 mx-auto mt-16">
      <CardContent className="flex flex-col gap-8">
        {daysOfWeek.map((day) => {
          return (
            <CreateScheduleForm
              key={day}
              day={day}
              setScheduleData={setScheduleData}
            />
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SchedulePage;
