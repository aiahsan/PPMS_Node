const { Project } = require('../models/project');
const express = require('express');
const router = express.Router();
const response = require('../helpers/response');
const mongoose = require('mongoose');
const validate = require('../helpers/validationSchema')
const { ProjectSchema, ProjectCompleteSchema, ProjectArchivedSchema } = require('../helpers/validationSchema/schemas')

router.get(`/`, async (req, res) => {
    const ProjectList = await Project.find();

    if (!ProjectList) {
        return res.status(500).json(response(false, "Can not retrieve data", {}))
    }
    return res.status(200).json(response(true, "All Project", ProjectList));
})

router.post(`/`, validate(ProjectSchema), async (req, res) => {
    
    const { projectName, description, startDate, image, techStacks, githubRepo, liveUrl } = req.body;
    let project = new Project({
        projectName,
        description,
        startDate,
        image,
        techStacks: JSON.parse(techStacks),
        githubRepo,
        liveUrl,
        isArchived: false,
        isCompleted: false,
        craetedAt: new Date()
    })
    project = await project.save();

    if (!project)
        return res.status(200).json(response(false, "the project cannot be created!", {}))

    return res.status(200).json(response(true, "project created successfully", project));
})

router.post(`/archived`, validate(ProjectArchivedSchema), async (req, res) => {
    const { isArchived, id } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json(response(false, "Invalid service Id", {}))

    }

    const project = await Project.findByIdAndUpdate(
        id,
        {

            isArchived:!isArchived,

        },
        { new: true }
    )

    if (!project)
        return res.status(500).json(response(false, "the project cannot be updated!", {}))

    return res.status(200).json(response(true, "The Project Updated Successfully", project));
})

router.post(`/completed`, validate(ProjectCompleteSchema), async (req, res) => {
    const { isCompleted, id } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json(response(false, "Invalid service Id", {}))

    }

    const project = await Project.findByIdAndUpdate(
        id,
        {

            isCompleted:!isCompleted,

        },
        { new: true }
    )

    if (!project)
        return res.status(500).json(response(false, "the project cannot be updated!", {}))

    return res.status(200).json(response(true, "The Project updated Successfully", project));
})

router.put(`/`, validate(ProjectSchema), async (req, res) => {

    const { projectName, description, startDate, image, techStacks, githubRepo, liveUrl, isArchived, isCompleted, id } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json(response(false, "Invalid service Id", {}))

    }

    const project = await Project.findByIdAndUpdate(
        id,
        {
            projectName,
            description,
            startDate,
            image,
            techStacks: JSON.parse(techStacks),
            githubRepo,
            liveUrl,
            isArchived,
            isCompleted
        },
        { new: true }
    )

    if (!project)
        return res.status(500).json(response(false, "the project cannot be updated!", {}))

    return res.status(200).json(response(true, "the project updated successfully", project));
})

module.exports = router;