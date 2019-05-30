import React from 'react'

const ResComment = props => {
  return (
    <>
      <div className="row justify-content-end">
        <div className="col-md-10">
          <div class="media ">
            <div class="media-body d-flex py-4">
              <div className="col-md-3 d-flex">
                <div className="avatar mx-4">
                  <img src="/images/article/test4.jpg" class="mr-3" alt="..." />
                </div>
                <div>
                  <div>{props.author}</div>
                  <div>{props.date}</div>
                </div>
              </div>
              <div className="col-md-9">{props.content}</div>
              <div className="commentGroup">讚</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResComment
