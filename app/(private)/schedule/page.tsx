"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CreateScheduleForm } from "./_scheduleForm";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { daysOfWeek } from "@/constants/constants";

type TimeRange = { from: string; to: string };

export type ScheduleData = {
  id: string;
  [day: string]: TimeRange[] | string;
};

const SchedulePage = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);

  console.log(scheduleData);

  return (
    <Card className="w-3/5 mx-auto my-16">
      <CardContent className="flex flex-col gap-8">
        <CardTitle className="text-3xl font-semibold text-center">
          My Schedule
        </CardTitle>
        {daysOfWeek.map((day, index) => {
          return (
            <div key={day}>
              <CreateScheduleForm day={day} setScheduleData={setScheduleData} />
              {daysOfWeek.length - 1 !== index && <Separator />}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SchedulePage;
