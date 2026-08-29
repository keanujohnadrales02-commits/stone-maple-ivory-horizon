import { createFileRoute } from "@tanstack/react-router";
import { Close } from "@/components/keanu/Close";
import { DoorTheater } from "@/components/keanu/DoorTheater";
import { Hero } from "@/components/keanu/Hero";
import { How } from "@/components/keanu/How";
import { Work } from "@/components/keanu/Work";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <DoorTheater>
      {{
        hero: <Hero />,
        how: <How />,
        work: <Work />,
        close: <Close />,
      }}
    </DoorTheater>
  );
}
