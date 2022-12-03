import React, {useState } from 'react';
import { Pregunta } from 'interface/Pregunta';
import data from 'db/balotario.json';
import 'styles/home.scss';

const getQuestion = (index: number): Pregunta => data.preguntas[index];

const Home = () => {
  const [card, setCard] = useState<Pregunta>(getQuestion(0));
  const [selected, setSelected] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [score, setScore] = useState<number[]>([0,0]);

  const handleSelect = (e: any) => {
    setSelected(parseInt(e.target.value, 10));
  };

  const handleCheck = () => 
  {
    if (isChecked) return;

    const newScore = score.slice();

    if(selected === card.rpta) newScore[0] += 1 
    else newScore[1] += 1 

    setScore(newScore)

    setIsChecked(true);
  }

  const handleSubmit = () => {
    const currentIndex = parseInt(card.id, 10) - 1;
    const question = getQuestion(currentIndex + 1);
    setCard(question);
    setSelected(0);
    setIsChecked(false);
  };

  const getOptionStyle = (value: number): string => {
    let style = '';
    if (isChecked) {
      if (selected === value && selected !== card.rpta) style = 'bg-red-200';

      if (value === card.rpta) style += 'bg-green-200';
    }
    return style;
  };

  const getRadioStyle = (value: number): string => {
    let style = '';
    if (isChecked) {
      if (selected === value && selected !== card.rpta) style = '-wrong';

      if (value === card.rpta) style += '-right';
    }
    return style;
  };

  return (
    <div className='w-ful h-1/2 flex flex-col items-center justify-center'>
      <div className='mt-4'>Correctas: {score[0]} | Incorrectas: {score[1]}</div>
      <div className='card-container p-4'>
        <h2 className='font-bold text-3xl mb-2'>Pregunta {card.id}</h2>
        <p className='mb-4'>{card.desc}</p>

        {card.imgSrc && (<div className='flex items-center justify-center mb-4'><img src={card.imgSrc} alt='pregunta_imagen'/></div>)}

        <ul onChange={handleSelect} className='flex flex-col gap-4 mb-4'>
          {card.opciones.map((opcion: string, index: number) => (
            <li
              className={`radio flex items-center gap-4 rounded-lg pr-2 
              ${getOptionStyle(index + 1)}`}
              key={opcion}
            >
              <label
                htmlFor={opcion}
                className={`radio-label${getRadioStyle(
                  index + 1,
                )} px-2 py-1 rounded-lg flex justify-center items-center text-xl lg:text-xl font-bold`}
              >
                <input value={index + 1} type='radio' hidden id={opcion} name='opciones' disabled={isChecked}/>
                {opcion.substring(0, 1).toUpperCase()}
              </label>
              <label htmlFor={opcion}>{opcion.substring(2)}</label>
            </li>
          ))}
        </ul>

        {/* <button type='button' onClick={() => handleBack()}>RETROCEDER</button> */}
        <div className='flex gap-4 justify-center'>
          <button type='button' className='btn text-blue-700' onClick={() => handleCheck()} disabled={isChecked}>
            COMPROBAR
          </button>

          <button
            type='button'
            className='btn text-white bg-blue-700'
            onClick={() => handleSubmit()}
            disabled={!isChecked}
          >
            CONTINUAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
