import React from 'react';
import './article.css';
import ArticleCard from './ArticleCard';

const ArticleList = props => {
  console.log('ArticleListKey' + props.sid);
  return (
    <ArticleCard
      sid={props.sid}
      cardImg={props.cardImg}
      cardTitle={props.cardTitle}
      cardText={props.cardText}
      isMarked={props.isMarked}
    />
  );
};

export default ArticleList;
