import React from 'react'
import { Row, Col } from 'react-bootstrap'
import '../../article.css'
import {
  FaBookmark,
  FaShareSquare,
  FaCommentAlt,
  FaThumbsUp,
} from 'react-icons/fa'

const ArticleComment = props => {
  return (
    <button className="btn btn-sm  ml-3 btn-warning">
      <FaCommentAlt className="mr-1" />
      留言
    </button>
  )
}

export default ArticleComment
