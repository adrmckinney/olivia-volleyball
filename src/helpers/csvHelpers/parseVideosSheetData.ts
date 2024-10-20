import { VideoData } from '../../types/VideoData';

export const parseVideosSheetData = (csv: string): VideoData[] => {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');

    const videos = lines.slice(1).map(line => {
        const values = line.split(',').map(value => value.trim());
        const obj: { [key: string]: string } = {};
        headers.forEach((header, index) => {
            obj[header.replace(/\r/g, '')] = values[index].replace(/\r/g, '');
        });

        return obj as VideoData;
    });

    if (!Array.isArray(videos)) {
        return [videos];
    }

    return videos;
};
