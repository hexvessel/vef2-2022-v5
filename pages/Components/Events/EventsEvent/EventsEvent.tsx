import Link from 'next/link';
import PropTypes from 'prop-types';


EventsEvent.propTypes = {
    url: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
}


export default function EventsEvent({ url = 0, name = '', description = '' }) {
    return (
        <li className="events__event">
            <Link href={"/"+ url.toString()}>{name}</Link>
            <p className="events__eventDescription">{description}</p>
        </li>
    )
}