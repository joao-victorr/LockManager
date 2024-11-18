import { useState } from "react";


interface Props {
  props: {
    handleModalUser: () => void;
  };
}

export const ModalAddUser = ({ props }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const uploadPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        const reader = new FileReader();
        reader.onload = () => {
          setImageSrc(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Apenas imagens PNG ou JPEG são permitidas!");
      }
    }
  };

  const handleCreate = () => {
    const selectedUnits: { id: string; departmentID: string }[] = [];
    const articles = document.querySelectorAll("article[data-unit-id]");

    for (const article of articles) {
      const unitId = article.getAttribute("data-unit-id") || "";
      const selectedRadio = article.querySelector<HTMLInputElement>(
        "input[type='radio']:checked"
      );

      if (selectedRadio) {
        const departmentId =
          selectedRadio.parentElement?.getAttribute("data-dept-id") || "";
        selectedUnits.push({ id: unitId, departmentID: departmentId });
      }
    }

    console.log(selectedUnits);
  };

  return (
    <div className="absolute inset-0 bg-yellow-100 w-4/5 h-[95%] m-auto shadow-lg rounded-3xl flex flex-col justify-between p-4">
      <div className="flex justify-between">
        <h2 className="flex justify-center items-center text-2xl">
          Adicionar Usuário
        </h2>
        <span className="flex gap-4 flex-row justify-end p-4">
          <button
            type="button"
            onClick={props.handleModalUser}
            className="bg-red-300 p-2 w-32 rounded-3xl hover:bg-red-600"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleCreate}
            className="bg-green-300 p-2 w-32 rounded-3xl hover:bg-green-600"
          >
            Criar
          </button>
        </span>
      </div>

      <div className="flex-1 flex gap-2">
        <section className="flex flex-col gap-6">
          <span className="flex w-full items-center flex-col">
            <img
              src={imageSrc || ""}
              alt="Preview"
              className="w-full object-cover border border-gray-300"
            />
            <span className="flex gap-2 p-2">
              <input
                type="file"
                accept="image/png, image/jpeg"
                id="file-upload"
                style={{ display: "none" }}
                onChange={uploadPhoto}
              />
              <button
                type="button"
                onClick={() => document.getElementById("file-upload")?.click()}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Arquivos
              </button>
              <button
                type="button"
                onClick={() => {
                  setImageSrc(null);
                }}
                className="bg-gray-400 p-2 rounded"
              >
                Remover
              </button>
            </span>
          </span>
          <span>
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" className="p-2 w-full" required />
          </span>
        </section>

        <section className="bg-blue-400 w-[80%] p-4 flex gap-4">
          {/* Unidade ADM - EXTERNO */}
          <article data-unit-id="unit-001">
            <span>
              <span>ADM - EXTERNO</span>
            </span>
            <ul>
              <li data-dept-id="dept-001">
                <input type="radio" id="comercia-001" name="unit-001" />
                <label htmlFor="comercia-001">COMERCIA</label>
              </li>
              <li data-dept-id="dept-002">
                <input type="radio" id="ti-001" name="unit-001" />
                <label htmlFor="ti-001">TI</label>
              </li>
              <li data-dept-id="dept-003">
                <input type="radio" id="financeiro-001" name="unit-001" />
                <label htmlFor="financeiro-001">FINANCEIRO</label>
              </li>
            </ul>
          </article>

          {/* Unidade FABRICA - EXTERNO */}
          <article data-unit-id="unit-002">
            <span>
              <span>FABRICA - EXTERNO</span>
            </span>
            <ul>
              <li data-dept-id="dept-004">
                <input type="radio" id="comercia-002" name="unit-002" />
                <label htmlFor="comercia-002">COMERCIA</label>
              </li>
              <li data-dept-id="dept-005">
                <input type="radio" id="ti-002" name="unit-002" />
                <label htmlFor="ti-002">TI</label>
              </li>
              <li data-dept-id="dept-006">
                <input type="radio" id="financeiro-002" name="unit-002" />
                <label htmlFor="financeiro-002">FINANCEIRO</label>
              </li>
              <li data-dept-id="dept-007">
                <input type="radio" id="marketing-001" name="unit-002" />
                <label htmlFor="marketing-001">MARKETING</label>
              </li>
            </ul>
          </article>

          {/* Unidade LOJA - T4 */}
          <article data-unit-id="unit-003">
            <span>
              <span>LOJA - T4</span>
            </span>
            <ul>
              <li data-dept-id="dept-008">
                <input type="radio" id="comercia-003" name="unit-003" />
                <label htmlFor="comercia-003">COMERCIA</label>
              </li>
              <li data-dept-id="dept-009">
                <input type="radio" id="ti-003" name="unit-003" />
                <label htmlFor="ti-003">TI</label>
              </li>
              <li data-dept-id="dept-010">
                <input type="radio" id="financeiro-003" name="unit-003" />
                <label htmlFor="financeiro-003">FINANCEIRO</label>
              </li>
            </ul>
          </article>
        </section>
      </div>
    </div>
  );
};
