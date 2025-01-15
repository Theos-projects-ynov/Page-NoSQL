import mongoose from 'mongoose';

const { Schema } = mongoose;

const answerSchema = new Schema({
    responderId: { type: String, required: true},
    auhtorFormId: { type: String, required: true},
    formId: { type: String, required: true},
    questions: { type: [Schema.Types.Mixed], required: true },
}, { strict: false });

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;
