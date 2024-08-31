import path from 'path';
import { exportAnalytics, getAnalyticsSummary } from '../utils/analytics';
import { logger } from '../utils/logger';
import { setAdminPassword, verifyAdminPassword } from '../utils/auth';

export async function analyticsCommand(options: {
    export?: string;
    summary?: boolean;
    setPassword?: boolean;
}): Promise<void> {
    try {
        if (options.setPassword) {
            await setAdminPassword();
            return;
        }

        const isAdmin = await verifyAdminPassword();
        if (!isAdmin) {
            logger.error('Authentication failed. Access denied.');
            return;
        }

        if (options.export) {
            const outputPath = path.resolve(process.cwd(), options.export);
            await exportAnalytics(outputPath);
            logger.success(`Analytics data exported to ${outputPath}`);
        } else if (options.summary) {
            const summary = await getAnalyticsSummary();
            console.log(JSON.stringify(summary, null, 2));
        } else {
            logger.warning(
                'No valid option provided. Use --help for usage information.'
            );
        }
    } catch (error) {
        logger.error('Failed to process analytics', error);
    }
}
