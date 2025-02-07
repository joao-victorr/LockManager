import type React from 'react';

type DaysOfWeekInputProps = {
  selectedDays: string[]; // Estado dos dias selecionados (recebido do componente pai)
  onDaysChange: (days: string[]) => void; // Função para atualizar o estado no componente pai

};

const DaysOfWeekInput: React.FC<DaysOfWeekInputProps> = ({
  selectedDays,
  onDaysChange,

}) => {
  // Função para lidar com a seleção de dias
  const handleDayChange = (day: DaysOfWeek) => {
    const updatedDays = selectedDays.includes(day.id)
      ? selectedDays.filter((d) => d !== day.id) // Remove o dia se já estiver selecionado
      : [...selectedDays, day.id]; // Adiciona o dia se não estiver selecionado
    onDaysChange(updatedDays); // Atualiza o estado no componente pai
  };



  return (
    <div className="space-y-6">
      {/* Dias da semana */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Dias da Semana</h2>
        <div className="grid grid-cols-2 gap-2">
          {daysOfWeek.map((day) => (
            <label key={day.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedDays.includes(day.id)}
                onChange={() => handleDayChange(day)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>{day.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DaysOfWeekInput;



const daysOfWeek = [
  { id: "sun", name: 'Domingo' },
  { id: "mon", name: 'Segunda' },
  { id: "tue", name: 'Terça' },
  { id: "wed", name: 'Quarta' },
  { id: "thu", name: 'Quinta' },
  { id: "fri", name: 'Sexta' },
  { id: "sat", name: 'Sábado' },
]

type DaysOfWeek = {
  id: string;
  name: string;
}