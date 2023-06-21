import { useKeyPress } from "ahooks";
import {
  deleteComponent,
  copyComponent,
  pasteComponent,
  selectPreviousComponent,
  selectNextComponent,
} from "../store/componentsReducer";
import { useDispatch } from "react-redux";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { setIsUser } from "../store/userActionReducer";

/**
 *
 * Check if component with focus is valid or not
 */

function isActiveElementValid() {
  const activeElement = document.activeElement;

  if (activeElement === document.body) {
    return true;
  }
  // after add drag function, here it does not work. Therefore add this if-condition
  if (activeElement?.matches(`div[role="button"]`)) {
    return true;
  }
  return false;
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch();
  // delete
  useKeyPress(["backspace", "delete"], () => {
    if (!isActiveElementValid()) {
      return;
    }
    dispatch(deleteComponent());
    dispatch(setIsUser(true));
  });

  // copy
  useKeyPress(["ctrl.c", "meta.c"], () => {
    if (!isActiveElementValid()) {
      return;
    }
    dispatch(copyComponent());
  });

  // paste
  useKeyPress(["ctrl.v", "meta.v"], () => {
    if (!isActiveElementValid()) {
      return;
    }
    dispatch(pasteComponent());
    dispatch(setIsUser(true));
  });

  // choose previous component
  useKeyPress(["uparrow"], () => {
    if (!isActiveElementValid()) {
      return;
    }
    dispatch(selectPreviousComponent());
  });

  // choose next component
  useKeyPress(["downarrow"], () => {
    if (!isActiveElementValid()) {
      return;
    }
    dispatch(selectNextComponent());
  });

  // undo
  useKeyPress(
    ["ctrl.z", "meta.z"],
    () => {
      if (!isActiveElementValid()) {
        return;
      }
      dispatch(UndoActionCreators.undo());
    },
    {
      exactMatch: true, // only ctrl + z. ctrl + shift + z won't trigger this
    }
  );

  // redo
  useKeyPress(["ctrl.shift.z", "meta.shift.z"], () => {
    if (!isActiveElementValid()) {
      return;
    }
    dispatch(UndoActionCreators.redo());
  });
}

export default useBindCanvasKeyPress;
