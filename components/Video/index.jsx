'use client'

import getAssetURL from '@/lib/get-asset-url';


const Videos = ({ videoData }) => {
  const videoD = videoData
  const getYouTubeVideoId = (url) => {
    if (!url) return null;

    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=(.+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/(.+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/(.+)/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/(.+)/
    ];

    for (let pattern of patterns) {
      let match = url.match(pattern);
      if (match) return match[1];
    }

    return null;
  };



  const videoId = getYouTubeVideoId(videoD?.video_url);
  console.log('video_url', videoD?.video_url);
  console.log('videoId', videoId);
  return (
    <section className='py-16'>
      <div className='max-w-[1200px] mx-auto'>

        <div className='mb-2 w-full flex flex-col items-center justify-center text-center'>
          <h1 className='mb-5 text-xl font-bold text-blue3 dark:text-white sm:text-2xl lg:text-xl xl:text-2xl'>
            {videoD?.title}
          </h1>
          <p>
            {videoD?.headline}
          </p>
        </div>

        <div className="lg:py-10 py-6 px-4 h-[550px] lg:h-[700px] w-full mx-auto">
          {videoId ? (

            <iframe
              className="h-full w-full rounded-lg"
              // https://youtube.com/shorts/LAnYpJvykjE?si=x37NRTOxYrNrTBOS
              src={`https://www.youtube.com/embed/${videoId}`}
              width="100%"
              title="YouTube video player"
              allow="acceleRometer; autoplay; clipboardWrite; encryptedMedia; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

          ) : (

            <video
              // autoPlay

              muted
              playsInline
              controls
              height="100%" width="100%" className="bg-black w-full h-full" >
              <source src={getAssetURL(videoD?.video_file?.filename_disk)} />
              {/* Your browser does not support the video tag... */}
            </video>

          )}
        </div>
      </div>
    </section>
  );
};

export default Videos;
