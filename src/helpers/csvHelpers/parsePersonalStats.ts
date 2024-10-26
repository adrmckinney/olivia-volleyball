type ParsedCSVRow = {
    key: string;
    label: string;
    value: string;
    render: boolean;
};

export function parsePersonalStats(csv: string): ParsedCSVRow[] {
    const rows = csv
        .split('\n')
        .map(row => row.trim())
        .filter(row => row); // Split by line and trim whitespace

    // Get headers (keys) from the first row
    const headers = rows[0].split(',').map(header => header.trim());

    // Parse the rest of the rows into objects with defined types
    const jsonData: ParsedCSVRow[] = rows.slice(1).map(row => {
        const values = row.split(',').map(value => value.trim());

        const obj: ParsedCSVRow = {
            key: '',
            label: '',
            value: '',
            render: false,
        };

        headers.forEach((header, index) => {
            const value: string | boolean = values[index];

            switch (header) {
                case 'key':
                    obj.key = value;
                    break;
                case 'label':
                    obj.label = value;
                    break;
                case 'value':
                    // Remove surrounding quotes and reduce inner escaped quotes to single
                    obj.value = value.replace(/^"(.*)"$/, '$1').replace(/""/g, '"');
                    break;
                case 'render':
                    obj.render = value === 'TRUE';
                    break;
            }
        });

        return obj;
    });

    // Filter the data to only include rows where render is true
    return jsonData.filter(row => row.render === true);
}
