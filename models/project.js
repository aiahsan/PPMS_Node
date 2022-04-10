const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    image: {
        type: String,
    },
    techStacks: {
        type: [String],
    },
    githubRepo:{
        type: String,
    },
    liveUrl:{
        type: String,
    },
    isArchived:{
        type: Boolean,
    },
    isCompleted:{
        type: Boolean,
    },
    craetedAt:{
        type:Date
    }
   
   
})


projectSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

projectSchema.set('toJSON', {
    virtuals: true,
});

exports.Project = mongoose.model('Project', projectSchema);
