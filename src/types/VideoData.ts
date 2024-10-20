export type VideoData = {
    title: string;
    key: VideoKeys;
    videoId: string;
};

type VideoKeys =
    | 'setting_outside'
    | 'setting_right_side'
    | 'setting_middle'
    | 'back_row'
    | 'digs'
    | 'dumps';
