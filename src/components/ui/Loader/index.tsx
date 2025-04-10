import style from "./style.module.css";

interface Props {
  size?: "sm" | "md" | "lg";
}

const Loader = ({ size = "md" }: Props) => {
  const getSize = () => {
    switch (size) {
      case "sm":
        return { width: "15px", borderWidth: "2px" };
      case "md":
        return { width: "30px", borderWidth: "5px" };
      case "lg":
        return { width: "45px", borderWidth: "5px" };
    }
  };

  const { width, borderWidth } = getSize();

  return (
    <span
      className={style.loader}
      style={{ height: width, width, borderWidth }}
    />
  );
};

export default Loader;
