import mongoose from 'mongoose';

const { Schema } = mongoose;

const formSchema = new Schema({
    name: { type: String, required: true },
    banner : { type: String, required: false, default: 'https://th.bing.com/th/id/OIP.7sMSAXgECAXyym5d19hhGgHaEj?rs=1&pid=ImgDetMain' },
    authorId: { type: String, required: true},
    questions: { type: [Schema.Types.Mixed], required: true },
}, { strict: false });

const Form = mongoose.model('Form', formSchema);

export default Form;
