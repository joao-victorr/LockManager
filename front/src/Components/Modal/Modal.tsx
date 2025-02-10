import type { ReactNode } from "react"

type Props = {
  props: {
    title: string
    onClickCanceled: () => void;
    onClickSaved: () => void;
  }
  children: ReactNode;
}


export const Modal = ({ props, children }: Props) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-200 p-4 rounded-lg shadow-lg max-w-full max-h-full overflow-auto">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">{props.title}</h1>

        {children}

        <span className="flex flex-row gap-4">
          <button
            type="button"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={props.onClickCanceled}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={props.onClickSaved}
          >
            Salvar
          </button>
        </span>
      </div>
    </div>

  )
}

