import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../../article.css';
import {
  FaBookmark,
  FaShareSquare,
  FaCommentAlt,
  FaThumbsUp,
} from 'react-icons/fa';

const ArticleShare = props => {
  return (
    <button className="btn btn-sm  ml-3 btn-warning">
      <FaShareSquare className="mr-1" />
      按讚
    </button>
  );
};

export default ArticleShare;
