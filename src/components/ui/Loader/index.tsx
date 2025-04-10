import style from "./style.module.css";

interface Props {
  size?: "sm" | "md" | "lg";
}

const Loader = ({ size = "md" }: Props) => {
  const getSize = () => {
    switch (size) {
      case "sm":
        return "15px";
      case "md":
        return "30px";
      case "lg":
        return "45px";
    }
  };

  return (
    <span
      className={style.loader}
      style={{ height: getSize(), width: getSize() }}
    />
  );
};

export default Loader;
