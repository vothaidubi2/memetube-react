import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const DateConvert = ({ date }) => {
  // Chuyển đổi ngày thành chuỗi "x days ago"
  const formattedDate = formatDistanceToNow(new Date(date), { addSuffix: true });

  return (
    <span>{formattedDate}</span>
  );
};

export default DateConvert;
