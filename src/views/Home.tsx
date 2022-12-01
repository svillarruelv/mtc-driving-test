import React, { useEffect, useState } from 'react';
import { Pregunta } from 'interface/Pregunta';
import data from 'db/balotario.json';

const getQuestion = (index: number): Pregunta => data.preguntas[index];

const Home = () => {
  const [card, setCard] = useState<Pregunta>(getQuestion(0));
  const [selected, setSelected] = useState<number>(-1);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  
  const handleSelect = (e: any) => {setSelected(parseInt(e.target.value,10))}

  const handleBack = () => {
    const currentIndex = parseInt(card.id, 10) - 1;
    if (currentIndex === 0) return;

    const question = getQuestion(currentIndex - 1)
    setCard(question)
  }
  const handleSubmit = (value: any) => {
    if (value !== card.rpta) {
      setIsWrong(true);
      return;
    }
    setIsWrong(false);
    const currentIndex = parseInt(card.id, 10) - 1;
    const question = getQuestion(currentIndex + 1)
    setCard(question)
    setSelected(-1)

    
  }

  useEffect(() => {
    
    const inputs = Array.from(document.querySelectorAll('input'));

    const selectedInput = inputs.filter((e) => e.checked)[0]
  
    setSelected(parseInt(selectedInput.value,10))

  }, [card])
  

  return (
    <>
      <h2>Pregunta {card.id}</h2>
      <p>{card.desc}</p>

      <ul onChange={handleSelect}>
        {card.opciones.map((opcion, index) => (
          <li>
            <label htmlFor={opcion}>
              <input value={index+1} type='radio' id={opcion} name='opciones'/>
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
