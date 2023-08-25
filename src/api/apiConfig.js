const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '98df64ba8bec3f8aff0d9e2f8fb7639a',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig