import produce from "immer";
import { SET_CATEGORY } from "../actions/types";

const initialState = {
  category: "Top Picks",
  displayOptions: {
    searchTerm: ""
  }
};

export default produce((draft, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      draft.category = action.payload;
      return;
  }
}, initialState);
