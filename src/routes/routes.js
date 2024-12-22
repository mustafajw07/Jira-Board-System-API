import { Router } from 'express';
import userController from "../controllers/user.controller.js";
import roleController from "../controllers/role.controller.js";
import boardController from "../controllers/board.controller.js";
import sprintController from "../controllers/sprint.controller.js";
import storyController from "../controllers/story.controller.js";
import epicController from "../controllers/epic.controller.js";
import storyStatusController from "../controllers/storyStatus.controller.js";
import storyTypeController from "../controllers/storyType.controller.js";
import storyPriorityController from "../controllers/storyPriority.controller.js";

const api = Router()
    .use(userController)
    .use(roleController)
    .use(boardController)
    .use(sprintController)
    .use(storyController)
    .use(epicController)
    .use(storyStatusController)
    .use(storyTypeController)
    .use(storyPriorityController);

export default Router().use('/api', api);