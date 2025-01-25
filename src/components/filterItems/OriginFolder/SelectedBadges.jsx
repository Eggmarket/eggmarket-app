import SelectBadge from "@/components/UI/SelectBadge";
import React from "react";

export default function SelectedBadges({ selectedBadges, closeBadgeHandler }) {
  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {selectedBadges?.map((badge) => (
        <SelectBadge key={badge.id} badge={badge} onClose={closeBadgeHandler} />
      ))}
    </div>
  );
}
