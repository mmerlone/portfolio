import { Dispatch, SetStateAction } from "react";

export const tiltBoxEffect = (e: React.MouseEvent, setPosition: Dispatch<SetStateAction<{
  x: number;
  y: number;
}>>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  setPosition({
    x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
    y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
  });
};
