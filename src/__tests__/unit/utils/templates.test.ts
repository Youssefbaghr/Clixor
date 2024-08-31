import { getProjectTemplates } from '../../../templates/project-templates';

describe('Templates Utils', () => {
  it('should return a list of templates', () => {
    const templates = getProjectTemplates();
    expect(templates).toBeDefined();
    expect(Object.keys(templates).length).toBeGreaterThan(0);
  });
});
