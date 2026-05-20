import type { CourseDashboard } from "../types";
import { formatCLP } from "../utils";

export default function CourseProgress({
  course,
}: {
  course: CourseDashboard;
}) {


  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-medium capitalize">
          {course.courseName}
        </span>

        <span className="text-sm text-gray-500">
          {formatCLP(course.raised)} /{" "}
          {formatCLP(course.goal)}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-blue-500 h-full transition-all"
          style={{
            width: `${Math.min(course.progress, 100)}%`,
          }}
        />
      </div>

      <p className="text-right text-md text-gray-300 mt-1">
        {course.progress}%
      </p>
    </div>
  );
}
