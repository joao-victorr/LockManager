import type React from 'react';

type DaysOfWeekInputProps = {
  selectedDays: string[]; // Estado dos dias selecionados (recebido do componente pai)
  onDaysChange: (days: string[]) => void; // Função para atualizar o estado no componente pai
  // selectedHolidays: string[]; // Estado dos feriados selecionados (recebido do componente pai)
  // onHolidaysChange: (holidays: string[]) => void; // Função para atualizar o estado no componente pai
};

const DaysOfWeekInput: React.FC<DaysOfWeekInputProps> = ({
  selectedDays,
  onDaysChange,
  // selectedHolidays,
  // onHolidaysChange,
}) => {
  // Função para lidar com a seleção de dias
  const handleDayChange = (day: string) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day) // Remove o dia se já estiver selecionado
      : [...selectedDays, day]; // Adiciona o dia se não estiver selecionado
    onDaysChange(updatedDays); // Atualiza o estado no componente pai
  };

  // Função para lidar com a seleção de feriados
  // const handleHolidayChange = (holiday: string) => {
  //   const updatedHolidays = selectedHolidays.includes(holiday)
  //     ? selectedHolidays.filter((h) => h !== holiday) // Remove o feriado se já estiver selecionado
  //     : [...selectedHolidays, holiday]; // Adiciona o feriado se não estiver selecionado
  //   onHolidaysChange(updatedHolidays); // Atualiza o estado no componente pai
  // };



  return (
    <div className="space-y-6">
      {/* Dias da semana */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Dias da Semana</h2>
        <div className="grid grid-cols-2 gap-2">
          {[
            'Domingo',
            'Segunda',
            'Terça',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sábado',
          ].map((day) => (
            <label key={day} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedDays.includes(day)}
                onChange={() => handleDayChange(day)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>{day}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Feriados */}
      {/* <div>
        <h2 className="text-lg font-semibold mb-2">Feriados</h2>
        <div className="grid grid-cols-2 gap-2">
          {['Feriados 1', 'Feriados 2', 'Feriados 3'].map((holiday) => (
            <label key={holiday} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedHolidays.includes(holiday)}
                onChange={() => handleHolidayChange(holiday)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>{holiday}</span>
            </label>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default DaysOfWeekInput;