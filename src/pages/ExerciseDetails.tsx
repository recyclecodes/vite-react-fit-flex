import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Detail from '@/components/Detail';
import SuggestedVideos from '@/components/SuggestedVideos';
import { exerciseOptions, fetchData, youtubeOptions } from '../lib/fetchData';

interface ExerciseDetail {
  bodyPart: string;
  gifUrl: string;
  name: string;
  target: string;
  equipment: string;
}

interface Video {
  videoId: string;
  thumbnails: { url: string }[];
  title: string;
  channelName: string;
}

interface SuggestedVideo {
  video: Video;
}

const ExerciseDetails = () => {
  const [exerciseDetail, setExerciseDetail] = useState<ExerciseDetail | null>(null);
  const [suggestedVideos, setSuggestedVideos] = useState<SuggestedVideo[]>([]); // Specify the type explicitly
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchExercisesData = async () => {
      try {
        const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
        const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

        const exerciseDetailData = await fetchData(
          `${exerciseDbUrl}/exercises/exercise/${id}`,
          exerciseOptions
        );

        const suggestedVideosData = await fetchData(
          `${youtubeSearchUrl}/search?query=${exerciseDetailData.name}&type=v&sort=ra`,
          youtubeOptions
        );

        setExerciseDetail(exerciseDetailData);
        setSuggestedVideos(suggestedVideosData.contents);
      } catch (error) {
        console.error('Failed to fetch exercise details:', error);
      }
    };

    fetchExercisesData();
  }, [id]);

  if (!exerciseDetail) return <div>No Data</div>;

  return (
    <div>
      <Detail exerciseDetail={exerciseDetail} />
      <SuggestedVideos
        suggestedVideos={suggestedVideos}
        name={exerciseDetail.name}
      />
    </div>
  );
};

export default ExerciseDetails;
