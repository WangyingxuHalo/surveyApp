import { ComponentInfoType } from ".";

export function getNextSelectedId(
  fe_id: string,
  componentList: Array<ComponentInfoType>
) {
  const visibleList = componentList.filter((component) => !component.isHidden);
  const index = visibleList.findIndex((component) => component.fe_id === fe_id);
  if (index < 0) {
    return "";
  }
  let newSelectedId = "";
  const length = visibleList.length;
  if (length <= 1) {
    // If there's only one element
    newSelectedId = "";
  } else {
    if (index === length - 1) {
      // If this is the last one
      newSelectedId = visibleList[index - 1].fe_id;
    } else {
      // Otherwise it is the next one
      newSelectedId = visibleList[index + 1].fe_id;
    }
  }
  return newSelectedId;
}
