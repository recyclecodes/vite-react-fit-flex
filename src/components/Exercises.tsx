import { useState, useRef, useEffect, FC } from 'react';
import ExerciseCard from './ExerciseCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import { exerciseOptions, fetchData } from '@/lib/fetchData';

interface Exercise {
  id: string;
  gifUrl: string;
  name: string;
  bodyPart: string;
  target: string;
}

interface BodyPart {
  name: string;
}

interface ExercisesProps {
  exercises: Exercise[];
  setExercises: (exercises: Exercise[]) => void;
  bodyPart: BodyPart | string;
}

const Exercises: FC<ExercisesProps> = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 12;
  const resultsContainerRef = useRef<HTMLDivElement | null>(null);

  const calculateIndexOfFirstExercise = (pageNumber: number, perPage: number): number =>
    (pageNumber - 1) * perPage;
  
  const indexOfFirstExercise = calculateIndexOfFirstExercise(currentPage, exercisesPerPage);
  const indexOfLastExercise = indexOfFirstExercise + exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const totalPages = Math.ceil(exercises.length / exercisesPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    setCurrentPage(pageNumber);

    if (resultsContainerRef.current) {
      resultsContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData: Exercise[] = [];

      if (bodyPart === 'all') {
        exercisesData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises?limit=12',
          exerciseOptions
        );
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=50`,
          exerciseOptions
        );
      }

      setExercises(exercisesData);
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <Pagination className="pb-12">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={`cursor-pointer ${currentPage === 1 ? 'disabled-class' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => handlePageChange(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className={`cursor-pointer ${currentPage === totalPages ? 'disabled-class' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="container mx-auto mt-8">
      {exercises.length > 0 && (
        <>
          <h1 className="text-2xl font-bold text-center mb-2">Discover Fit Flex</h1>
          <p className="text-base text-center mb-6">Start with this Tailored Exercises</p>
          <div
            ref={resultsContainerRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12"
          >
            {currentExercises.map((exercise, index) => (
              <ExerciseCard key={index} exercise={exercise} />
            ))}
          </div>
          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default Exercises;
