import { atom, selector } from "recoil";

// Example Atom States
export const tempFilter = atom({
  key: "tempFilter",
  default: {},
});

export const filter = atom({
    key: "filter",
    default: {},
  });

export const cartState = atom({
  key: "cartState",
  default: [],
});
export const openModal = atom({
  key: "openModal",
  default: "",
});
export const currUser = atom({
  key: "currUser",
  default:null,
});
export const loading = atom({
  key: "loading",
  default:null,
});