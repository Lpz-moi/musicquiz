const SPOTIFY_TOKEN = 'BQDmWeGF1Ii4zhj8d2HpPvG8nfEg-QTRYlcCgBiyC3n-dHY0dfuhst2OaLcN9Mb9w0GwaiEEAYSA4Ec_Kr9fwBJlVwCCbkIlzC-xaw1aAWPwh8NU59C2vCe0MrJO1KONX-nSwAShR-RzvoxkmuI0eJNhbGXptkhKnad0A9Gr-VFNwZLc3TUiSCUEEU065CyvD7wBt1CB6UPlL0axT5btCx6cVGFfZJAa1vq3bnIK8Y8X02O7NyHrJyhV6p-f7IrWZSyf6Q_wwASUYH5BwaWzKP9IfEQucLonwTy17t5eg8Y8gXMR2-l5KMXF';

export async function fetchSpotifyApi(endpoint: string, method = 'GET', body?: any) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${SPOTIFY_TOKEN}`,
      'Content-Type': 'application/json',
    },
    method,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new Error(`Spotify API error: ${res.statusText}`);
  }

  return res.json();
}

export async function getTopTracks() {
  const data = await fetchSpotifyApi('v1/me/top/tracks?time_range=long_term&limit=5');
  return data.items;
}