import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { NavLink } from "react-router-dom";

const poses = [
  "Downward Dog",
  "Warrior I",
  "Tree Pose",
  "Child's Pose",
  "Cobra Pose",
  "Bridge Pose",
  "Seated Forward Bend",
  "Cat-Cow Stretch",
  "Triangle Pose",
  "Crow Pose",
];

export function ListScrollArea() {
  return (
    <>
      <h4 className="mb-0 text-sm leading-none font-medium">
        Select the pose to get started:
      </h4>
      <ScrollArea className="h-48 w-full rounded-md border">
        <div className="p-4">
          {poses.map((pose) => {
            const link=pose.trim().toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
            return (
              <NavLink to={`/video/${link}`} key={pose} className="block">
                <React.Fragment key={pose}>
                  <div className="text-sm">{pose}</div>
                  <Separator className="my-2" />
                </React.Fragment>
              </NavLink>
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
}
