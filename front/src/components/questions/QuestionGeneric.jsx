import React, { useEffect, useState } from 'react'
import ShortQuestion from "./ShortQuestion";
import LongQuestion from "./LongQuestion";
import RadioQuestion from "./RadioQuestion";
import CheckboxQuestion from "./CheckboxQuestion";
// import img from '../assets/img.png';
// import '../styles/style.css'

function QuestionGeneric({index, question, setQuestion}) {
    const [selectedOption, setSelectedOption] = useState('');
    const [test, setTest] = useState('');

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
        console.log("question: ");
        console.log(question);
        console.log("\n");
    }

    const handleSubmit = () => {
        if (selectedOption === "short_question") return <ShortQuestion index={index} question={question} setQuestion={setQuestion} />
        else if (selectedOption === "long_question") return <LongQuestion index={index} question={question} setQuestion={setQuestion} />
        else if (selectedOption === "radio_question") return <RadioQuestion index={index} question={question} setQuestion={setQuestion} />
        else if (selectedOption === "checkbox_question") return <CheckboxQuestion index={index} question={question} setQuestion={setQuestion} />
    }

    useEffect(() => {
        console.log("\n\n\nTest:");
        console.log(question);
        question[index].type = selectedOption;
    }, [question]);

    return (

        <div id="test">
            <br/>

            Type : <select id="dropdown" name="options" value={selectedOption}
                           onChange={handleChange}>
            <option value=""></option>
            <option value="short_question">Short Question</option>
            <option value="long_question">Long Question</option>
            <option value="radio_question">Radio Question</option>
            <option value="checkbox_question">Checkbox Question</option>
        </select>
            {handleSubmit()}
        </div>

    )
}

export default QuestionGeneric