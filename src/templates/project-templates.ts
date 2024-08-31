import { templateUrls } from '../config/templates';

export function getProjectTemplates() {
    return Object.keys(templateUrls);
}
