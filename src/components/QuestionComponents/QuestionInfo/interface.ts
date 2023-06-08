export type QuestionInfoPropsType = {
  title?: string;
  description?: string;
  onChange?: (newProps: QuestionInfoPropsType) => void;
  disabled?: boolean;
};

export const QuestionInfoDefaultProps = {
  title: "问卷标题",
  description: "问卷描述",
};
