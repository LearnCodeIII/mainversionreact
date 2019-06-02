import React from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'

const ForumArticleCommentInputRoy = props => {
  return (
    <>
      <InputGroup>
        <FormControl
          // 抓ID用於按鈕取消輸入留言內容
          id="CommentArea"
          className="text-light bg-dark border border-warning"
          as="textarea"
          aria-label="With textarea"
          placeholder={props.commentCount === 0 ? '搶頭香!' : '請輸入留言'}
          rows="3"
          name="forumComment"
          // 留言內容變更同時更動state
          onChange={props.handleCommentInputArea}
        />
      </InputGroup>
    </>
  )
}

export default ForumArticleCommentInputRoy
