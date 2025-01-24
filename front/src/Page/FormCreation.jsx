import React, { useEffect } from 'react'
import ShortQuestion from "../components/questions/ShortQuestion";
import QuestionGeneric from "../components/questions/QuestionGeneric";
import { submitForm } from "../service/formService";

function FormCreation() {
    const [question, setQuestion] = React.useState([]);
    const [form, setForm] = React.useState({
        name: "Nom du formulaire",
        title: "Titre",
        description: "LA GROS DESCRIPTION",
        questions: question,
        age: 25,
        email: "test@example.com",
        authorId: "6780ffdbaae783e48e36d1fd"
    });

    const handleAddQuestion = (e) => {
        e.preventDefault();
        setQuestion([
            ...question,
            {
                type: "short",
                title: "test",
                description: "tesst",
                required: false
            }
        ]);
    };

    const submit = async (e) => {
        e.preventDefault();
        console.log("Create form");
        console.log(form);

        const res = await submitForm(form);
        console.log("res : ");
        console.log(res);
    };

    useEffect(() => {
        setForm({
            ...form,
            questions: question
        });
    }, [question]);

    return (
        <>
            <h1>Form Creation</h1>
            <p>Form Creation</p>

            <button onClick={handleAddQuestion}>Add Question</button>

            {question.map((q, index) => (
                <QuestionGeneric
                    index={index}
                    question={question}
                    setQuestion={setQuestion}
                />
            ))}

            <button onClick={submit}>Submit</button>

        </>
    );
}

export default FormCreation;
