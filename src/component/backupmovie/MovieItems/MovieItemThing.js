import React from 'react'
import TopicBtn from './TopicBtn'

const MovieItemThing = props => ({
  render: function() {
    // console.log(props)
    // console.log(props.movieitemttl)
    // console.log(props.movieitem)

    return (
      <div className="searchbar-wrapper d-flex justify-content-center">
        <div className="row">
          {/* 因為不必左邊的小標 所以隱藏 有需要可打開排版 */}
          {/* <div className="col-1">
            <span
              className="mr-3"
              style={{
                fontSize: '24px',
              }}
            >
              {props.movieitemttl}
            </span>
          </div> */}
          <div className="col-12">
            {props.movieitem.map(items => (
              <TopicBtn btnText={items} />
            ))}
          </div>
        </div>
      </div>
    )
  },
})

export default MovieItemThing
