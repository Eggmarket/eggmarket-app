"use client";
import { usePathname } from "next/navigation";
export default function Path({ childProp, excludePath = [] }) {
  const path = usePathname();

  return <>{excludePath.includes(path) ? null : childProp}</>;
}
