import { fullHeightFlex } from "./fullHeight";

export const globalStyles = {
  html: {
    height: "100%",
  },
  body: {
    height: "100%",
    display: "flex",
    margin: 0,
  },
  "#root": {
    ...fullHeightFlex,
  }
};
