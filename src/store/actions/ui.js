import { DRAWER_STATE } from "../types";

export const drawerState = (value) => {
  return {
    type: DRAWER_STATE,
    payload: value,
  };
};
