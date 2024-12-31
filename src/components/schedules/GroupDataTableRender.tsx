import { Group } from '../../helpers/csvHelpers/parseScheduleSheet';
import ConditionalRender from '../../sharedComponents/ConditionalRender';

type Props = {
    group: Group;
};

const GroupDataTableRender = ({ group }: Props) => {
    return (
        <div className="flex divide-x-2 divide-gray-50">
            <p className="pr-4">{group.tournament}</p>
            <p className="px-4">{group.location}</p>
            <ConditionalRender
                condition={group.startDate === group.endDate}
                falseRender={
                    <p className="pl-4">
                        {group.startDate} - {group.endDate}
                    </p>
                }
            >
                <p className="pl-4">{group.startDate}</p>
            </ConditionalRender>
        </div>
    );
};

export default GroupDataTableRender;
