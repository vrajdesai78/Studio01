import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import clsx from "clsx";
import { useStudioState } from "@/store/studioState";

const LayoutChange = () => {
  const { layout, setLayout } = useStudioState();

  return (
    <Card className="w-96 max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Layout</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Image
            src="/layout/1.png"
            className={clsx(
              "rounded-lg cursor-pointer",
              layout === 1 && "ring-2 ring-gray-600 bg-gray-800"
            )}
            alt="layout-1"
            width={150}
            height={150}
            onClick={() => setLayout(1)}
          />
          <Image
            src="/layout/2.png"
            className={clsx(
              "rounded-lg cursor-pointer",
              layout === 2 && "ring-2 ring-gray-600 bg-gray-800"
            )}
            alt="layout-2"
            width={150}
            height={150}
            onClick={() => setLayout(2)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LayoutChange;
