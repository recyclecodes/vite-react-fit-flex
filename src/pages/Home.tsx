import { useState } from 'react';
import Exercises from '@/components/Exercises';
import HeroBanner from '@/components/HeroBanner';
import SearchExercises from '@/components/SearchExercises';

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

const HomePage = () => {
  const [bodyPart, setBodyPart] = useState<BodyPart>({
    id: 'all',
    name: 'All', 
    description: 'Explore exercises for all body parts.',
  });
  const [exercises, setExercises] = useState<Exercise[]>([]);

  return (
    <div className="flex flex-col min-h-[100vh]">
      <HeroBanner />
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        exercises={exercises}
      />
    </div>
  );
};

export default HomePage;
