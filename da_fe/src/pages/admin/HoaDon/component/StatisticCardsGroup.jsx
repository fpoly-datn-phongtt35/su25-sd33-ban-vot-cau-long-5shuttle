import React from 'react';
import { Grid } from '@mui/material';
import StatisticCard from './Card';

const StatisticCardsGroup = ({ cards }) => {
  return (
    <Grid container spacing={3}>
      {cards.map((card) => {
        // Logic chia cột: 4 thẻ đầu chiếm 6/12, thẻ Tùy chỉnh chiếm 12/12
        const columnSize = card.id === 'Tùy chỉnh' ? 12 : 6;

        return (
          <Grid item xs={12} md={columnSize} key={card.id}>
            <StatisticCard {...card} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default StatisticCardsGroup; 