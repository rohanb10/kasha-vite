import area from '../assets/icons/area.png';
import hospitality from '../assets/icons/hospitality.png';
import retail from '../assets/icons/retail.png';
import commercial from '../assets/icons/commercial.png';
import residential from '../assets/icons/residential.png';
import furniture from '../assets/icons/furniture.png';
import material from '../assets/icons/material.png';
import completion from '../assets/icons/completion.png';
import location from '../assets/icons/location.png';

function Details({details, showLabels = true, showIcons = true, classes="details-box"}) {
    const detailMap = [
        {
            key: 'type',
            label: 'Typology',
            icon: location,
        },
        {
            key: 'area',
            label: 'Area',
            icon: area,
        },
        {
            key: 'completion',
            label: 'Completion',
            icon: completion,
        },
        {
            key: 'location',
            label: 'Location',
            icon: location,
        },
        {
            key: 'material',
            label: 'Material',
            icon: material,
        },
    ];

    function getTypeIcon(detail) {
        const typeMap = {
            'Residential': residential,
            'Furniture': furniture,
            'Commercial': commercial,
            'Hospitality': hospitality,
            'Retail': retail,
        }
        return typeMap[detail] || location;
    }

    return <div className={classes}>
        {detailMap.map((d, i) => {
            if (details?.[d.key]?.length) return (
                <div className={`detail ${d.key}`} key={i}>
                    {showIcons && <img className="detail-icon" src={d.key === 'type' ? getTypeIcon(details?.[d.key]) : d.icon} alt={d.label} />}
                    <div className="detail-text">
                        {showLabels && <div className="detail-title">{d.label}</div>}
                        <div className="detail-value">{details?.[d.key]}</div>
                    </div>
                </div>
            );
        })}
    </div>
}
export default Details;