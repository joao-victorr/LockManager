import type { ReactNode } from "react";

type Props = {
  props: {
    class?: string;
    text: string;
    type: "button" | "reset" | "submit";
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    onClick: (arg0?: any) => void
  };
  children?: ReactNode;
}

export const Btn: React.FC<Props> = ({ props, children } : Props) => {
  return (
    <button
      type={props.type}
      className={`${props.class ?? "mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"}`}
      onClick={props.onClick}
    >
      {props.text} { children ?? children}
    </button>

  );
};