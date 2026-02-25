import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import YearMonthWeekSelector from "../components/YearMonthWeekSelector";
import ContentTypeSelector from "../components/ContentTypeSelector";
import PaperUpload from "../components/PaperUpload";
import TuteUpload from "../components/TuteUpload";
import VideoUpload from "../components/VideoUpload";

export default function ContentPage() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");
  const [contentType, setContentType] = useState("papers");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Year, Month, Week Selection */}
          <YearMonthWeekSelector
            year={year}
            month={month}
            week={week}
            onYearChange={setYear}
            onMonthChange={setMonth}
            onWeekChange={setWeek}
          />

          {/* Content Type Selection */}
          <ContentTypeSelector
            selectedType={contentType}
            onSelectType={setContentType}
          />

          {/* Dynamic Form Based on Content Type */}
          <div className="pt-4 border-t">
            {contentType === "papers" && (
              <PaperUpload year={year} month={month} week={week} />
            )}
            {contentType === "tutes" && (
              <TuteUpload year={year} month={month} week={week} />
            )}
            {contentType === "videos" && (
              <VideoUpload year={year} month={month} week={week} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
