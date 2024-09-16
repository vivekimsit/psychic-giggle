const TopTracks = () => {
  const { data, isLoading } = useSWR('/api/top-tracks', fetcher)

  return (
    <div>
      <h1 className="text-4xl font-bold">Top Tracks</h1>
    </div>
  )
}

export { TopTracks }
