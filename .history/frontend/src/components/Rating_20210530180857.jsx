import React from 'react'

const Rating = ({value, text, color}) => {
    return (
        <div className='rating'>
            <span>
                <i style={{color}} className={value >= 1 ? 'fas fa-star' :  value >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>

            <span>
                <i style={{color}} className={value >= 2 ? 'fas fa-star' :  value >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>

            <span>
                <i style={{color}} className={value >= 3 ? 'fas fa-star' :  value >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>

            <span>
                <i style={{color}} className={value >= 4 ? 'fas fa-star' :  value >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>

            <span>
                <i style={{color}} className={value >= 5 ? 'fas fa-star' :  value >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>

            <span>{text && text}</span>

        </div>
    )
}

Rating.defaultProps={
    color:'#f8e825'
}
// eslint-disable-next-line no-undef
Rating.propTypes={
    // eslint-disable-next-line no-undef
    value: PropTypes.number.isRequired,
    // eslint-disable-next-line no-undef
    text: PropTypes.string.isRequired,
    // eslint-disable-next-line no-undef
    color: PropTypes.string
}

export default Rating
