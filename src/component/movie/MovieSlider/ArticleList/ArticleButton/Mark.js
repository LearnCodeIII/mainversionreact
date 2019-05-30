import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../../article.css';
import {
  FaBookmark,
  FaShareSquare,
  FaCommentAlt,
  FaThumbsUp,
} from 'react-icons/fa';

const ArticleMark = props => {
  return (
    <button className="btn btn-sm  ml-3 btn-warning">
      <FaBookmark className="mr-1" />
      收藏
    </button>
  );
};

export default ArticleMark;