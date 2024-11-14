import React from 'react';
import { Link } from 'react-router-dom';

export interface MovieCardProps {
  imdbID: number;
  Poster: string;
  Title: string;
  Year: string;
  genre: string;
}
const MovieCard: React.FC<MovieCardProps> = ({
  imdbID,
  Poster,
  Title,
  Year,
}) => {
  const imageName = Poster.split('/').pop();
  const mediaURL = `${process.env.REACT_APP_MEDIA_URL}posters/${imageName}`;
  return (
    <Link to={`/movies/${imdbID}`} className='block w-full max-w-sm'>
      <div className='relative flex flex-col bg-white shadow-md border border-slate-200 rounded-lg overflow-hidden'>
        <div className='p-2.5 h-80 md:h-96 overflow-hidden'>
          <img
            src={mediaURL}
            alt={Title}
            className='h-full w-full object-cover rounded-t-md'
          />
        </div>
        <div className='p-4 bg-white rounded-b-lg'>
          <div className='flex items-center justify-between'>
            <p className='text-slate-800 text-lg font-semibold truncate'>
              {Title}
            </p>
            <p className='text-lg font-semibold'>({Year})</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
