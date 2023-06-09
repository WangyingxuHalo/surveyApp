import React, { FC, useState } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type PropsType = {
  children: JSX.Element | JSX.Element[]; //被SortableContainer包裹起来的元素
  items: Array<{ id: string; [key: string]: any }>;
  onDragEnd: (oldIndex: number, newIndex: number) => void;
};

const SortableContainer: FC<PropsType> = (props: PropsType) => {
  const { children, items, onDragEnd } = props;

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, // minimum trigger distance
      },
    })
  );

  // when dragging, the start position and end position
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over == null) return;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex(
        (component) => component.fe_id === active.id
      );
      const newIndex = items.findIndex(
        (component) => component.fe_id === over.id
      );

      onDragEnd(oldIndex, newIndex);

      return arrayMove(items, oldIndex, newIndex);
    }
  }

  return (
    // Outside container
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default SortableContainer;
