import React, { useState } from 'react';
import { Pregunta } from 'interface/pregunta';
import data from 'db/balotario.json';

const getQuestion = (index: number): Pregunta => data.preguntas[index];

const Home = () => {
  const [card, setCard] = useState<Pregunta>(getQuestion(0));
  const [selected, setSelected] = useState<string>('null');
  const [isWrong, setIsWrong] = useState<boolean>(false);

  const handleSelect = (rpta: any) => setSelected(rpta);
  const handleBack = () => {
    const currentIndex = parseInt(card.id, 10) - 1;
    if (currentIndex === 0) return;

    const question = getQuestion(currentIndex - 1)
    setCard(question)
  }
  const handleSubmit = (value: any) => {
    if (value === '0') {
      setIsWrong(true);
      return;
    }
    setIsWrong(false);
    const currentIndex = parseInt(card.id, 10) - 1;
    const question = getQuestion(currentIndex + 1)
    setCard(question)
    setSelected('0')
  }


  return (
    <>
      <h2>Pregunta {card.id}</h2>
      <p>{card.desc}</p>

      <ul>
        {card.opciones.map((opcion, index) => (
          <li>
            <label htmlFor={opcion}>
              <input onClick={() => handleSelect(index+1 === card.rpta ? '1' : '0')} type='radio' id={opcion} name='opciones'/>
              {opcion.substring(2)}
            </label>
          </li>
        ))}
      </ul>
      
      {isWrong && <p>ESTAS EQUIVOCADO</p>}

      <button type='button' onClick={() => handleBack()}>RETROCEDER</button>
      <button type='button' onClick={() => handleSubmit(selected)}>CONTINUAR</button>
    </>
  );
};

export default Home;
