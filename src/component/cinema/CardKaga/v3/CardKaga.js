import React from 'react'
import CardKagaBox from './CardKagaBox'
import CardKagaBoxInfo from './CardKagaBoxInfo'
import CardKagaCollection from './CardKagaCollection'
const CardKaga = props => {
  return (
    <div className="col-lg-3 col-md-6 my-3">
      <div className="position-relative m-auto" style={{ width: '250px' }}>
        {props.popup ? (
          <>
            <CardKagaBoxInfo
              id={props.id}
              title={props.title}
              subtitle={props.subtitle}
              img={props.img}
              link={props.link}
              popup={props.popup}
              member={props.member}
              star={props.star}
              starAmimation={props.starAmimation}
              mark={props.mark}
              newStarAndMark={props.newStarAndMark}
              del={props.del}
              AVStar={props.AVGStar}
              time={props.time}
            />
            {props.collectionIcon ? (
              <CardKagaCollection
                id={props.id}
                collectionIcon={props.collectionIcon}
                collectionClick={props.collectionClick}
                collection={props.collection}
              />
            ) : (
              ''
            )}
          </>
        ) : (
          <>
            <CardKagaBox
              id={props.id}
              title={props.title}
              subtitle={props.subtitle}
              img={props.img}
              link={props.link}
              star={props.star}
              AVStar={props.AVGStar}
            />
            {props.collectionIcon ? (
              <CardKagaCollection
                id={props.id}
                collectionIcon={props.collectionIcon}
                collectionClick={props.collectionClick}
                collection={props.collection}
              />
            ) : (
              ''
            )}
          </>
        )}
      </div>
    </div>
  )
}
export default CardKaga
