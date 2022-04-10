const yup = require("yup");


const userSchema = yup.object({
  body: yup.object({
    email: yup.string().required("Email Required").email('Input Corrent Email'),
    name: yup.string().required("Email Required"),
    password: yup.string()
      .required("Password Required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  }),

});
const LoginSchema = yup.object({
  body: yup.object({
    email: yup.string().required("Email Required").email('Input Corrent Email'),
    password: yup.string()
      .required("Password Required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  }),

});
const ProjectSchema = yup.object({
  body: yup.object({
    projectName: yup.string().required("Project Name Required"),
    description: yup.string().required("Description Required"),
    startDate: yup.string().required("StartDate Required"),
    image: yup.string().required("Image Required"),
    techStacks: yup.string().required("Tech Stacks Required"),
    githubRepo: yup.string().required("Github Repo Required"),
    liveUrl: yup.string().required("live Url Required"),
  }),

});
const ProjectCompleteSchema = yup.object({
  body: yup.object({

    isCompleted: yup.boolean().required("live Url Required"),
  }),

});
const ProjectArchivedSchema = yup.object({
  body: yup.object({

    isArchived: yup.boolean().required("live Url Required"),
  }),

});

exports.LoginSchema = LoginSchema;
exports.UserSchema = userSchema;
exports.ProjectSchema = ProjectSchema;
exports.ProjectCompleteSchema = ProjectCompleteSchema;
exports.ProjectArchivedSchema = ProjectArchivedSchema;
