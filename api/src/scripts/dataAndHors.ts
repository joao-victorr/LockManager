import * as fs from 'node:fs';
import * as path from 'path';
import axios from "axios";
import { allLocksSessions, loginLock } from "../LockController/LoginLock";



// Função para gravar no log
const logMessage = (name: string, message: string) => {

  const logDirPath = path.join(__dirname, '../../logs', 'updateDateTime');
  const logFilePath = path.join(logDirPath, `${name}.log`);

  if (!fs.existsSync(logDirPath)) {
    fs.mkdirSync(logDirPath, { recursive: true });
  }


  const logEntry = `${new Date().toISOString()} - \n\n${message}\n`;
  fs.appendFileSync(logFilePath, logEntry, 'utf8');
};


export const updateDateTime = async () => {
  await loginLock()
  console.log(allLocksSessions)

  const dateTime = {
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    second: new Date().getSeconds()
  }
  console.log(dateTime);

  for (const session of allLocksSessions) {
    const url = `http://${session.ip}/set_system_time.fcgi?session=${session.session}`
    console.log(url)

    try {
      const res = await axios.post(
        url,
        {
          day: dateTime.day,
          month: dateTime.month,
          year: dateTime.year,
          hour: dateTime.hour,
          minute: dateTime.minute,
          second: dateTime.second
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
      )
      const data = res.data;
      console.log(data)

      logMessage(`id-${session.id}`, `Data e hora atualizadas com sucesso na unidade ${session.ip}`);
    } catch (e) {
      logMessage(`id-${session.id}`, `Herro na atualização da data e hora ${session.ip} \n ${e}`);
    }
  }
  
}