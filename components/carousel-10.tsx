"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import CardDemo from "./card-01";

export default function SlideOpacity() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="mx-auto max-w-xs">
      <Carousel
        setApi={setApi}
        className="w-full max-w-xs mx-2"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="basis-10/12">
              <Card
                className={cn(
                  "bg-primary text-primary-foreground transition-all duration-500 h-[70vh]",
                  {
                    "opacity-30": index !== current - 1,
                  }
                )}
              >
                   <div className="w-full h-full -mt-6 ">
                  <img src="https://image.api.playstation.com/vulcan/ap/rnd/202405/2216/7b99ba464d6bf64d0b040c6b0871401e2f0f3ddbdebef11f.jpg"
                    className="w-full h-full object-cover rounded-xl"/>
                   </div>
                  <hr className="bg-black border-2"/>
                <CardContent className="flex h-[60vh]  justify-center p-6 ">
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat quos, qui quasi id sequi ratione rem minus assumenda nemo natus exercitationem numquam itaque fugiat veritatis totam autem amet et ducimus.
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
