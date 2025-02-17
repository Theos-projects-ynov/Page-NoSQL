import React from 'react';
import '../../Style/components/forms/formCard.sass';

function FormCard({name, banner, isEmpty, onClick}) {
    if (isEmpty) {
        return (
            <div className="form-card empty" onClick={onClick}>
                <div className="empty-content">
                    <span>+</span>
                </div>
            </div>
        );
    }
    return (
        <div
            className="form-card"
            style={{backgroundImage: `url(${banner})`}}
            onClick={onClick}
        >
            <div className="form-title">
                {name}
            </div>
        </div>
    );
}

export default FormCard;
