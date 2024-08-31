import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { ClixorConfig } from '../types';

export const getAnalyticsFilePath = () =>
    path.join(os.homedir(), '.clixor-analytics.json');

interface AnalyticsEvent {
    timestamp: string;
    event: string;
    data: any;
}

interface AnalyticsData {
    events: AnalyticsEvent[];
    projectCreations: number;
    commandUsage: Record<string, number>;
}

let analyticsData: AnalyticsData = {
    events: [],
    projectCreations: 0,
    commandUsage: {},
};

async function loadAnalyticsData(): Promise<void> {
    const analyticsFile = getAnalyticsFilePath();
    if (await fs.pathExists(analyticsFile)) {
        analyticsData = await fs.readJson(analyticsFile);
    }
}

async function saveAnalyticsData(): Promise<void> {
    const analyticsFile = getAnalyticsFilePath();
    await fs.writeJson(analyticsFile, analyticsData, { spaces: 2 });
}

export async function trackEvent(event: string, data: any): Promise<void> {
    await loadAnalyticsData();

    const analyticsEvent: AnalyticsEvent = {
        timestamp: new Date().toISOString(),
        event,
        data,
    };

    analyticsData.events.push(analyticsEvent);
    if (event === 'project_created') {
        analyticsData.projectCreations++;
    } else if (event === 'command_used') {
        const command = data.command;
        analyticsData.commandUsage[command] =
            (analyticsData.commandUsage[command] || 0) + 1;
    }

    await saveAnalyticsData();
}

export async function trackProjectCreation(
    config: ClixorConfig
): Promise<void> {
    await trackEvent('project_created', {
        name: config.name,
        template: config.template,
        packageManager: config.packageManager,
        features: config.features,
    });
}

export async function trackCommandUsage(command: string): Promise<void> {
    await trackEvent('command_used', { command });
}

export async function exportAnalytics(outputPath: string): Promise<void> {
    await loadAnalyticsData();
    await fs.writeJson(outputPath, analyticsData, { spaces: 2 });
}

export async function getAnalyticsSummary(): Promise<{
    totalProjects: number;
    recentProjects: AnalyticsEvent[];
    commandUsage: Record<string, number>;
}> {
    await loadAnalyticsData();
    return {
        totalProjects: analyticsData.projectCreations,
        recentProjects: analyticsData.events
            .filter(
                (event: AnalyticsEvent) => event.event === 'project_created'
            )
            .slice(-10),
        commandUsage: analyticsData.commandUsage,
    };
}
