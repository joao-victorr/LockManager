import type React from 'react';

type Props = {
  props: {
    type:  React.HTMLInputTypeAttribute;
    class?: string;
    placeholder?: string;
    ico?: string;
    label?: string;

    onChange?: (e: string) => void;
    value?: string;


  },
  children?: React.ReactNode; // Add children prop if needed for input validation or other features.
}

export const Inp: React.FC<Props> = ({ props }: Props) => {
  return (
    <div className="relative">
      <label>
        {props.label && (<span>{props.label}</span>)}
        <input
          type={props.type}
          placeholder={props.placeholder}
          autoComplete={props.type === "password" ? "current-password" : undefined}
          className={`px-4 py-2 border-2 rounded-md text-lg w-full ${props.class}`}
          value={props.value}
          onChange={(e) => props.onChange?.(e.target.value)}
        />

        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          { props.ico && <img src={`${props.ico}`} alt="Search" className="h-5 w-5" />}
        </div>
      </label>
      
    </div>
  );
};


