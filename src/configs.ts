export const configs = {
    env: import.meta.env.VITE_APP_ENV || 'staging',
    sheets: {
        personalStats: {
            documentId: import.meta.env.VITE_MAIN_GOOGLE_DOCUMENT_ID,
            sheetId: import.meta.env.VITE_PERSONAL_STATS_SHEET_ID,
        },
        jammers2024Schedule: {
            documentId: import.meta.env.VITE_MAIN_GOOGLE_DOCUMENT_ID,
            sheetId: import.meta.env.VITE_JAMMERS2024_SCHEDULE_SHEET_ID,
        },
        jammers2025Schedule: {
            documentId: import.meta.env.VITE_MAIN_GOOGLE_DOCUMENT_ID,
            sheetId: import.meta.env.VITE_JAMMERS2025_SCHEDULE_SHEET_ID,
        },
        riverside2024Schedule: {
            documentId: import.meta.env.VITE_MAIN_GOOGLE_DOCUMENT_ID,
            sheetId: import.meta.env.VITE_RIVERSIDE2024_SCHEDULE_SHEET_ID,
        },
        videos: {
            documentId: import.meta.env.VITE_MAIN_GOOGLE_DOCUMENT_ID,
            sheetId: import.meta.env.VITE_VIDEOS_SHEET_ID,
        },
        featureFlags: {
            documentId: import.meta.env.VITE_MAIN_GOOGLE_DOCUMENT_ID,
            sheetId: import.meta.env.VITE_FEATURE_FLAGS_SHEET_ID,
        },
    },
    email: { publicKey: import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY },
    featureFlags: {
        schedulesAndStats: import.meta.env.VITE_SCHEDULES_AND_STATS === 'true',
        jammers2024Schedule: import.meta.env.VITE_FEATURE_JAMMERS_2024_SCHEDULE === 'true',
        jammers2025Schedule: import.meta.env.VITE_FEATURE_JAMMERS_2025_SCHEDULE === 'true',
        riverside2024Schedule: import.meta.env.VITE_RIVERSIDE_2024_SCHEDULE_SHEET_ID === 'true',
        aboutSection: import.meta.env.VITE_FEATURE_ABOUT_SECTION === 'true',
    },
};
