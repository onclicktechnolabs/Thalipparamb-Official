// Widget : Stat Style 
// Style : Stat widget with right top icon

// import node module libraries
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const StatRightTopIcon = props => {
    const { info, tab, setTab } = props;
    return (
        <Card onClick={() => setTab(info?.id)} className={`${tab === info?.id ? "bg-light-info" : ""}`}>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3 ">
                    <div>
                        <h4 className="mb-0">{info.title}</h4>
                    </div>
                    <div className={`icon-shape icon-md bg-light-primary ${info.text_color}  rounded-2`}>
                        {info.icon}
                    </div>
                </div>
                <div>
                    <h1 className="fw-bold">{info.value}</h1>
                    <p className={`mb-0 ${info.text_color}`} dangerouslySetInnerHTML={{ __html: info.statInfo }}></p>
                </div>
            </Card.Body>
        </Card>
    )
}

// Typechecking With PropTypes
StatRightTopIcon.propTypes = {
    info: PropTypes.any.isRequired
};

export default StatRightTopIcon