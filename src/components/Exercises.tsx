import React, { useEffect, useRef, useState } from 'react';
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

interface BodyPart {
  id: string;
  name: string;
  description: string;
}

interface Exercise {
  id: string;
  gifUrl: string;
  name: string;
  bodyPart: string;
  target: string;
}

interface ExercisesProps {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
  bodyPart: BodyPart;
}

const Exercises: React.FC<ExercisesProps> = ({
  exercises,
  setExercises,
  bodyPart,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const exercisesPerPage: number = 12;
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const calculateIndexOfFirstExercise = (
    pageNumber: number,
    perPage: number
  ): number => (pageNumber - 1) * perPage;

  const indexOfFirstExercise: number = calculateIndexOfFirstExercise(
    currentPage,
    exercisesPerPage
  );
  const indexOfLastExercise: number = indexOfFirstExercise + exercisesPerPage;

  const currentExercises: Exercise[] = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const totalPages: number = Math.ceil(exercises.length / exercisesPerPage);

  const handlePageChange = (pageNumber: number): void => {
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
      setLoading(true);
      try {
        let exercisesData: Exercise[] = [];

        if (bodyPart.id === 'all') {
          exercisesData = await fetchData(
            'https://exercisedb.p.rapidapi.com/exercises?limit=12',
            exerciseOptions
          );
        } else {
          exercisesData = await fetchData(
            `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart.name}?limit=50`,
            exerciseOptions
          );
        }

        setExercises(exercisesData);
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
        // Optionally, set state to indicate error or display error message
      } finally {
        setLoading(false);
      }
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  const renderPagination = (): JSX.Element | null => {
    if (totalPages <= 1) return null;

    return (
      <Pagination className="pb-12">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => handlePageChange(currentPage - 1)}
              isActive={currentPage === 1}
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
              className="cursor-pointer"
              onClick={() => handlePageChange(currentPage + 1)}
              isActive={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="container mx-auto mt-8">
      {loading && <p className="text-center">Loading...</p>}
      {exercises.length > 0 && !loading && (
        <>
          <h1 className="text-2xl font-bold text-center mb-2">
            Discover Fit Flex
          </h1>
          <p className="text-base text-center mb-6">
            Start with these Tailored Exercises
          </p>
          <div
            ref={resultsContainerRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12"
          >
            {currentExercises.map((exercise: Exercise, index: number) => (
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
