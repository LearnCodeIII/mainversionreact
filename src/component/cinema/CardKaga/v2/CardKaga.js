import React from 'react'
import CardKagaBox from './CardKagaBox'
import CardKagaCollection from './CardKagaCollection'

const CardKaga = props => {
    return (
        <div className="col-3">
            <div
                className="position-relative mx-auto"
                style={{ width: '250px' }}
            >
                <CardKagaBox
                    title={props.title}
                    subtitle={props.subtitle}
                    img={props.img}
                />
                <CardKagaCollection
                    collectionIcon={props.collectionIcon}
                    collectionClick={props.collectionClick}
                    collection={props.collection}
                />
            </div>
        </div>
    )
}
export default CardKaga
