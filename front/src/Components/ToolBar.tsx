import { Btn } from "./Buttons/Btn"
import { Inp } from "./Inputs/Inp"



type Props = {
  props: {
    onClickDelet: () => void;
    ModalOpen: () => void;
  }
}

export const ToolBar = ({ props }: Props) => {


  return (
    <section className="w-full h-100 bg-red-50 p-4 flex flex-row justify-between items-center">
        <span className="flex flex-row gap-4">
            <Btn 
                props={{text:"Adicionar", type: "button", onClick: props.ModalOpen }}
            />

            <Btn 
                props={{text:"Apagar", type: "button", onClick: props.onClickDelet }}
            />
        </span>

        <span>
            <Inp
                props={{type: "text", placeholder: "Procure o seu horario"}}
            />
        </span>
    </section>
  )
}