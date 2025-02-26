if (typeof globalThis.import === 'undefined') {
    globalThis.import = { meta: { env: {} } };
}

globalThis.import.meta = {
    env: {
        VITE_MAIN_GOOGLE_DOCUMENT_ID: 'test-document-id',
        VITE_FEATURE_FLAGS_SHEET_ID: 'test-sheet-id',
        VITE_PERSONAL_STATS_SHEET_ID: 'test-personal-stats-id',
    },
};
