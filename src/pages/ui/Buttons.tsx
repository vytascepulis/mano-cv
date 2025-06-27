import Button from "@/components/ui/Button";
import { twMerge } from "tailwind-merge";

const colors = ["primary", "danger", "light"];
const sizes = ["sm", "md", "lg"];
const variants = ["default", "outline", "link"];

const Buttons = () => {
  return (
    <div className="border-b border-slate-900 pb-10">
      <h1 className="mb-5 text-4xl font-bold">Buttons</h1>
      <div className="flex flex-row gap-5">
        <div
          className={`grid grid-cols-[repeat(3,max-content)] place-items-start gap-4 grid-rows-${variants.length * colors.length}`}
        >
          {colors.map((color) => {
            return sizes.map((size) => {
              return variants.map((variant) => {
                return (
                  <div
                    key={`${color}-${size}-${variant}`}
                    className={twMerge(color === "light" && "bg-dark", "p-3")}
                  >
                    <Button
                      // @ts-expect-error expected
                      color={color}
                      // @ts-expect-error expected
                      size={size}
                      // @ts-expect-error expected
                      variant={variant}
                    >
                      {color}-{size}-{variant}
                    </Button>
                  </div>
                );
              });
            });
          })}
        </div>

        <div
          className={`grid grid-cols-[repeat(3,max-content)] place-items-start gap-4 grid-rows-${variants.length * colors.length}`}
        >
          {colors.map((color) => {
            return sizes.map((size) => {
              return variants.map((variant) => {
                return (
                  <div
                    key={`${color}-${size}-${variant}`}
                    className={twMerge(color === "light" && "bg-dark", "p-3")}
                  >
                    <Button
                      disabled
                      // @ts-expect-error expected
                      color={color}
                      // @ts-expect-error expected
                      size={size}
                      // @ts-expect-error expected
                      variant={variant}
                    >
                      {color}-{size}-{variant}
                    </Button>
                  </div>
                );
              });
            });
          })}
        </div>
        <div
          className={`grid grid-cols-[repeat(3,max-content)] place-items-start gap-4 grid-rows-${variants.length * colors.length}`}
        >
          {colors.map((color) => {
            return sizes.map((size) => {
              return variants.map((variant) => {
                return (
                  <div
                    key={`${color}-${size}-${variant}`}
                    className={twMerge(color === "light" && "bg-dark", "p-3")}
                  >
                    <Button
                      loading
                      // @ts-expect-error expected
                      color={color}
                      // @ts-expect-error expected
                      size={size}
                      // @ts-expect-error expected
                      variant={variant}
                    >
                      {color}-{size}-{variant}
                    </Button>
                  </div>
                );
              });
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default Buttons;
