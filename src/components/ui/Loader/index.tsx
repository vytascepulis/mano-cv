import style from "./style.module.css";

interface Props {
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
}

const Loader = ({ size = "md", variant = "light" }: Props) => {
  const getSize = () => {
    switch (size) {
      case "sm":
        return { width: "15px", borderWidth: "2px" };
      case "md":
        return { width: "30px", borderWidth: "3px" };
      case "lg":
        return { width: "45px", borderWidth: "5px" };
    }
  };

  const { width, borderWidth } = getSize();

  return (
    <span
      className={style.loader}
      style={{
        height: width,
        width,
        borderWidth,
        borderColor:
          variant === "dark"
            ? "oklch(55.1% 0.027 264.364)"
            : "oklch(98.5% 0.002 247.839)",
        borderBottomColor: "transparent",
      }}
    />
  );
};

export default Loader;
