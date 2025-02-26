export const configs = {
    env: 'test',
    sheets: {
        personalStats: {
            documentId: 'test-main-google-document-id',
            sheetId: 'test-personal-stats-sheet-id',
        },
        jammers2024Schedule: {
            documentId: 'test-main-google-document-id',
            sheetId: 'test-jammers2024-schedule-sheet-id',
        },
        jammers2025Schedule: {
            documentId: 'test-main-google-document-id',
            sheetId: 'test-jammers2025-schedule-sheet-id',
        },
        riverside2024Schedule: {
            documentId: 'test-main-google-document-id',
            sheetId: 'test-riverside2024-schedule-sheet-id',
        },
        videos: { documentId: 'test-main-google-document-id', sheetId: 'test-videos-sheet-id' },
        featureFlags: {
            documentId: 'test-main-google-document-id',
            sheetId: 'test-feature-flags-sheet-id',
        },
    },
    email: { publicKey: 'test-email-js-public-key' },
    featureFlags: {
        schedulesAndStats: true,
        jammers2024Schedule: true,
        jammers2025Schedule: true,
        riverside2024Schedule: true,
        aboutSection: true,
    },
};
